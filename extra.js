(() => {
  const angle = document.getElementById('angle');
  const mapping = document.getElementById('mapping');
  const result = document.getElementById('result');
  const value = document.getElementById('angleValue');
  const canvases = [document.getElementById('inputCanvas'), document.getElementById('outputCanvas')];
  const arrow = (ctx, x, y, color) => {
    const cx = 300, cy = 300, scale = 110, px = cx + scale*x, py = cy - scale*y;
    const theta = Math.atan2(py - cy, px - cx);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px-18*Math.cos(theta-0.48), py-18*Math.sin(theta-0.48)); ctx.lineTo(px-18*Math.cos(theta+0.48), py-18*Math.sin(theta+0.48)); ctx.closePath(); ctx.fill();
  };
  function draw(canvas, vectors) {
    const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,600,600);
    ctx.strokeStyle='#e1eaf5'; ctx.lineWidth=1;
    for(let t=80;t<=520;t+=110){ctx.beginPath();ctx.moveTo(t,20);ctx.lineTo(t,580);ctx.moveTo(20,t);ctx.lineTo(580,t);ctx.stroke();}
    ctx.strokeStyle='#9cacc1'; ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(20,300);ctx.lineTo(580,300);ctx.moveTo(300,20);ctx.lineTo(300,580);ctx.stroke();
    arrow(ctx,...vectors[0],'#2563c5'); arrow(ctx,...vectors[1],'#e56352');
  }
  function render() {
    const theta=Number(angle.value)*Math.PI/180;
    const a=[Math.cos(theta),Math.sin(theta)], b=[-Math.sin(theta),Math.cos(theta)];
    const key=mapping.value;
    const map=key==='square' ? ([x,y])=>[2*x,2*y] : key==='conjugate' ? ([x,y])=>[x,-y] : ([x,y])=>[2*x,y];
    const p=map(a), q=map(b);
    const dot=p[0]*q[0]+p[1]*q[1], det=p[0]*q[1]-p[1]*q[0];
    const degrees=Math.atan2(det,dot)*180/Math.PI;
    value.textContent=angle.value+'°';
    draw(canvases[0],[a,b]);draw(canvases[1],[p,q]);
    const context=key==='square'?'在 z₀=1，f′(1)=2，所以一阶近似为 Δf≈2h；精确增量为 2h+h²。':key==='conjugate'?'共轭使图形关于实轴反射：垂直与长度保留，但方向反转；它不满足柯西–黎曼方程。':'沿实轴和虚轴缩放比例不同，一般会改变夹角；在某些特殊方向仍可能恰好垂直。';
    result.textContent='输出中从蓝向量转到红向量的有向角：'+degrees.toFixed(1)+'°。'+context;
  }
  angle.addEventListener('input',render);mapping.addEventListener('change',render);render();
})();


