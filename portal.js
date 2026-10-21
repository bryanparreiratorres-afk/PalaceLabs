function visuals(){
  const root=document.documentElement;
  const toggle=document.getElementById("motion");
  let motion=!matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update(){
    root.classList.toggle("still",!motion);
    if(toggle){
      toggle.setAttribute("aria-pressed",String(motion));
      toggle.textContent=motion?"3D ativado":"3D pausado";
    }
  }

  update();
  if(toggle)toggle.addEventListener("click",()=>{motion=!motion;update();});

  for(const card of document.querySelectorAll(".portal")){
    card.addEventListener("pointermove",e=>{
      if(!motion||e.pointerType==="touch")return;
      const r=card.getBoundingClientRect();
      card.style.setProperty("--rx",`${-(e.clientY-r.top-r.height/2)/r.height*8}deg`);
      card.style.setProperty("--ry",`${(e.clientX-r.left-r.width/2)/r.width*9}deg`);
      card.style.setProperty("--glow",`${(e.clientX-r.left)/r.width*100}%`);
    });
    card.addEventListener("pointerleave",()=>{
      card.style.setProperty("--rx","0deg");
      card.style.setProperty("--ry","0deg");
    });
  }
}
visuals();
