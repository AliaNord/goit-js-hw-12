import{a as g,S as h,i as a}from"./assets/vendor-ee72e1a4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const u of e.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const b="44257136-dfc34124ab45074cb7ae2d95f",L="https://pixabay.com/api/";async function y(r,s=1,o=15){return(await g.get(L,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}})).data}function f(r,s=!1){const o=document.querySelector(".gallery"),l=r.map(e=>`<li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
            <ul class="descr-list">
              <li class="descr-item">
                <p class="category">Likes</p>
                <p class="value">${e.likes}</p>
              </li>
              <li class="descr-item">
                <p class="category">Views</p>
                <p class="value">${e.views}</p>
              </li>
              <li class="descr-item">
                <p class="category">Comments</p>
                <p class="value">${e.comments}</p>
              </li>
              <li class="descr-item">
                <p class="category">Downloads</p>
                <p class="value">${e.downloads}</p>
              </li>
            </ul>
          </a>
          </li>
        `).join("");s?o.insertAdjacentHTML("beforeend",l):o.innerHTML=l,new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const m=document.querySelector("#form-search"),v=document.querySelector("#input-search"),w=document.querySelector(".gallery"),n=document.querySelector(".loader"),i=document.querySelector("#load-more-btn");let c=1,p=1,d="";m.addEventListener("submit",S);i.addEventListener("click",R);async function S(r){r.preventDefault();const s=v.value.trim();if(s===""){a.error({position:"topRight",title:"Error",message:"Please fill out the search bar"});return}n.style.display="block",w.innerHTML="",c=1,d=s;try{const o=await y(d,c),l=o.hits;if(l.length===0){i.style.display="none",a.info({position:"topRight",title:"No Results",message:"Sorry... No results were found for your request"}),m.reset();return}f(l),c+=1,i.style.display="block",o.totalHits<15&&(i.style.display="none",a.info({position:"topRight",title:"No more results",message:"Sorry... This is all we managed to find"}))}catch{a.error({position:"topRight",title:"Error",message:"Failed to fetch images. Please try again later."})}finally{n.style.display="none"}}async function R(){n.style.display="block";try{const r=await y(d,c),s=r.hits;f(s,!0),n.style.display="none",i.style.display="block",window.scrollBy({top:720,behavior:"smooth"}),p=Math.ceil(r.totalHits/15),p===c&&(i.style.display="none",a.info({position:"topRight",title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{a.error({position:"topRight",title:"Error",message:"Failed to fetch images. Please try again later."})}finally{n.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
