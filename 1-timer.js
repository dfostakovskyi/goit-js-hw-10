import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as c}from"./assets/vendor-BZoxUzx5.js";let o;const t=document.querySelector("button[data-start]"),m=document.querySelector("#datetime-picker");t.disabled=!0;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){o=e[0],o<=new Date?(c.error({title:"Error",message:"Please choose a date in the future"}),t.disabled=!0):t.disabled=!1,console.log(o)}};y("#datetime-picker",b);t.addEventListener("click",()=>{if(!o){c.error({title:"Error",message:"Please select a date first"});return}t.disabled=!0,m.disabled=!0;const e=setInterval(()=>{const s=o-new Date;if(s<=0){clearInterval(e),c.success({title:"Time's up!",message:"The countdown has ended."}),m.disabled=!1,t.disabled=!0;return}const{days:i,hours:l,minutes:a,seconds:d}=r(s);document.querySelector("[data-days]").textContent=n(i),document.querySelector("[data-hours]").textContent=n(l),document.querySelector("[data-minutes]").textContent=n(a),document.querySelector("[data-seconds]").textContent=n(d)},1e3)});function r(e){const a=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:a,hours:d,minutes:f,seconds:h}}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));function n(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
