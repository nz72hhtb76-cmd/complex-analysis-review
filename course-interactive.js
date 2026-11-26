(()=>{
  const r=document.getElementById('series-r'), n=document.getElementById('series-n');
  if(r&&n){const render=()=>{const q=Number(r.value), N=Number(n.value), sum=(1-Math.pow(q,N+1))/(1-q), limit=1/(1-q);document.getElementById('series-r-value').textContent=q.toFixed(2);document.getElementById('series-n-value').textContent=N;document.getElementById('series-result').textContent=`Sₙ = 1 + r + ⋯ + rⁿ = ${sum.toFixed(5)}；无穷和 = ${limit.toFixed(5)}；绝对误差 = ${Math.abs(limit-sum).toFixed(5)}`;};r.addEventListener('input',render);n.addEventListener('input',render);render();}
  const c=document.getElementById('res-center'), radius=document.getElementById('res-radius');
  if(c&&radius){const render=()=>{const center=Number(c.value), rad=Number(radius.value), d0=Math.abs(center), d1=Math.abs(center-1), boundary=Math.abs(d0-rad)<1e-8||Math.abs(d1-rad)<1e-8;const zero=d0<rad,one=d1<rad;const sum=(zero?-1:0)+(one?1:0);document.getElementById('res-center-value').textContent=center.toFixed(2);document.getElementById('res-radius-value').textContent=rad.toFixed(2);const circle=document.getElementById('res-circle');circle.setAttribute('cx',175+60*center);circle.setAttribute('r',60*rad);const desc=boundary?'圆周经过极点：通常意义下积分不存在。':`圈内极点：${zero?'0 ':''}${one?'1':''}${!zero&&!one?'无':''}；留数和 = ${sum}；积分 = ${sum===0?'0':sum===1?'2πi':'−2πi'}。`;document.getElementById('res-result').textContent=desc;};c.addEventListener('input',render);radius.addEventListener('input',render);render();}
})();


