"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const navigation = [["01","AÇILIŞ","acilis"],["02","SEÇKİ","secki"],["03","HAREKET","hareket"],["04","ANLATILAR","anlatilar"],["05","MERAKLAR","meraklar"],["06","GECE","gece"],["07","SON SAYFA","son-sayfa"]];
const stories = [
  ["KAMPANYA","Görsel dünya ve yaratıcı yön"], ["DİJİTAL","İçerik ve sosyal strateji"],
  ["FİLM","Kısa form reklam anlatısı"], ["KİMLİK","Marka dili ve görsel sistem"],
  ["DENEYİM","Etkinlik ve yaratıcı kurgu"], ["EDİTORYAL","Moda, kültür ve görsel hikâye"],
];
const interests = [
  ["MODA", "Yeni siluetler", "/images/moda-dilara-sargin.png"],
  ["SİNEMA", "Hareket eden bakışlar", "/images/sinema-dilara-sargin.png"],
  ["KÜLTÜR", "Şehrin hafızası", "/images/kültür-dilara-sargin.png"],
  ["SES", "Tekrar eden hisler", "/images/ses-dilara-sargin.png"],
  ["NESNELER", "Işık ve tesadüf", "/images/nesneler-dilara-sargin.png"],
  ["İNSANLAR", "Bize kalan izler", "/images/insanlar-dilara-sargin.png"],
];
const selectionImages = ["select-01.png", "select-02.png", "select-03.png", "select-04.png"];

export default function Portfolio() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [cursor,setCursor]=useState({x:-100,y:-100,label:""});
  const [videoReady,setVideoReady]=useState(false);
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items=document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add("is-visible")),{threshold:.12});
    items.forEach(item=>observer.observe(item));
    const onScroll=()=>{if(reduced)return;document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(el=>{const rect=el.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight)el.style.setProperty("--shift",`${(rect.top-innerHeight/2)*Number(el.dataset.parallax||.06)}px`);});};
    onScroll();addEventListener("scroll",onScroll,{passive:true});return()=>{observer.disconnect();removeEventListener("scroll",onScroll);};
  },[]);
  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";return()=>{document.body.style.overflow="";}},[menuOpen]);
  const go=(id:string)=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});};
  const cursorLabel=(label:string)=>setCursor(c=>({...c,label}));
  return <main onMouseMove={e=>setCursor(c=>({...c,x:e.clientX,y:e.clientY}))}>
    <div className={`cursor ${cursor.label?"cursor--active":""}`} style={{transform:`translate(${cursor.x}px,${cursor.y}px)`}}>{cursor.label||"•"}</div>
    <div className="corner-monogram" aria-hidden="true">D</div>
    <button className="menu-trigger" onClick={()=>setMenuOpen(true)} aria-label="Menüyü aç"><span />MENÜ</button>
    <div className={`menu-panel ${menuOpen?"is-open":""}`} aria-hidden={!menuOpen}><button className="menu-close" onClick={()=>setMenuOpen(false)}>KAPAT <span>×</span></button><nav>{navigation.map(([no,label,id])=><button key={id} onClick={()=>go(id)}><small>{no}</small><span>{label}</span><b>→</b></button>)}</nav><p>DİLARA SARGIN — YARATICI GÜNLÜK</p></div>

    <section className="hero" id="acilis"><div className="hero-top"><span>BAĞIMSIZ BİR YARATICI GÜNLÜK</span><i aria-hidden="true">D</i><span>SAYI Nº01 / 2026</span></div><div className="hero-copy"><h1><span>DİLARA</span><em>SARGIN</em></h1><div className="hero-disciplines"><span>YARATICI YÖN</span><span>DİJİTAL KÜLTÜR</span><span>GÖRSEL HİKÂYE ANLATIMI</span></div><button onClick={()=>go("secki")}>KEŞFETMEYE BAŞLA <span>→</span></button></div><div className="hero-portrait" data-parallax=".025"><Image className="hero-editorial-image" src="/images/hero-editorial.png" alt="Dilara Sargın editorial portresi" fill priority sizes="(max-width: 800px) 84vw, 53vw"/></div><div className="hero-ghost">SARGIN</div><div className="scroll-cue"><span>AŞAĞI</span><i/></div></section>

    <section className="selection light" id="secki"><div className="selection-layout"><header className="selection-copy" data-reveal><span className="selection-number">02</span><h2>SEÇKİ</h2><p>İlham aldıklarım,<br/>iz bırakanlar ve<br/>kendi estetiğimden seçtiklerim.</p><button onClick={()=>document.querySelector(".selection-gallery")?.scrollIntoView({behavior:"smooth",block:"center"})}>KEŞFET <b>→</b></button></header><div className="selection-gallery">{selectionImages.map((file,index)=><article className="selection-card" key={file} data-reveal onMouseEnter={()=>cursorLabel("KEŞFET")} onMouseLeave={()=>cursorLabel("")}><Image src={`/images/${file}`} alt={`Seçki editorial görseli ${index+1}`} fill sizes="(max-width: 800px) 46vw, 18vw"/></article>)}</div></div></section>

    <section className="type-moment light"><p data-reveal><span>GÖRMEK</span><em>yetmez.</em><b>HİSSETTİRMELİ.</b></p><small>GÖRSEL HİKÂYE ANLATIMI / Nº01</small></section>

    <section className="motion dark" id="hareket"><div className="motion-layout"><header className="motion-heading"><span className="motion-number">03</span><h2>HAREKET</h2><p>Görüntü, ritim ve tavırla<br/>anlatılan hikâyeler.</p><button onClick={()=>document.querySelector(".film")?.scrollIntoView({behavior:"smooth",block:"center"})}>İZLE <b>→</b></button></header><div className="film" data-parallax=".012" onMouseEnter={()=>cursorLabel("İZLE")} onMouseLeave={()=>cursorLabel("")}><div className="film-placeholder" aria-hidden={videoReady}><span className="play-icon">▶</span><small>FASHION FILM / YAKINDA</small></div><video className={videoReady?"is-ready":""} autoPlay muted loop playsInline preload="metadata" onCanPlay={()=>setVideoReady(true)} onError={()=>setVideoReady(false)} aria-label="Dilara Sargın moda filmi"><source src="/videos/hareket.mp4" type="video/mp4"/>Tarayıcınız video etiketini desteklemiyor.</video></div></div></section>

    <div className="movement-to-story"><p data-reveal><span>HAREKETTEN</span><strong>HİKÂYEYE.</strong></p><i aria-hidden="true"/></div>

    <section className="stories light anlatilar-section" id="anlatilar"><div className="stories-layout anlatilar-layout"><aside className="stories-copy anlatilar-sidebar" data-reveal><span className="stories-number">04</span><h2>ANLATILAR</h2><p>Projelerim • Kampanyalarım •<br/>Yaratıcı çalışmalarım.</p><button onClick={()=>document.querySelector(".anlatilar-projects")?.scrollIntoView({behavior:"smooth",block:"center"})}>TÜM PROJELERİ GÖR <b>→</b></button><div className="stories-sign"><span>D</span><p>DILARA<br/>SARGIN<br/>PORTFOLIO</p></div></aside><div className="narrative-spread anlatilar-projects">{stories.map(([title,description],i)=><article className={`narrative-project narrative-${i+1}`} key={title} data-reveal onMouseEnter={()=>cursorLabel("İNCELE")} onMouseLeave={()=>cursorLabel("")}><div className="narrative-visual"/><div className="narrative-caption"><div><span><b>0{i+1}</b> / {title}</span><small>{description}</small></div><button>İNCELE <b>→</b></button></div></article>)}</div></div></section>

    <section className="interests" id="meraklar"><span className="folio">05</span><header className="section-heading inverse" data-reveal><span>ARŞİV & İLHAM</span><h2>MERAKLAR</h2><p>Notlarım, ilham panolarım, trendler ve zamansız detaylar.</p></header><div className="interest-rail">{interests.map(([title,description,src],i)=><article className={`interest interest-${i+1}`} key={title} data-reveal><div className="interest-art"><Image src={src} alt={`${title} — Dilara Sargın meraklar arşivi`} fill sizes="(max-width: 800px) 100vw, 33vw"/></div><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="night" id="gece"><span className="folio">06</span><header className="section-heading inverse" data-reveal><span>GECE NOTLARI</span><h2>GECE</h2><p>Fikirlerin karanlıkta parladığı yer.</p></header><div className="night-gallery" data-reveal><div className="night-placeholder night-placeholder-main"><Image src="/images/01 Ana Görsel .jpeg" alt="Gece — ana editorial görsel" fill sizes="(max-width: 800px) 100vw, 58vw"/><span>01</span><small>ANA GÖRSEL</small></div><div className="night-placeholder night-placeholder-secondary"><Image src="/images/02 Detay.jpeg" alt="Gece — editorial detay" fill sizes="(max-width: 800px) 100vw, 38vw"/><span>02</span><small>DETAY</small></div><div className="night-placeholder night-placeholder-tertiary"><Image src="/images/03 Atmosfer.jpeg" alt="Gece — editorial atmosfer" fill sizes="(max-width: 800px) 100vw, 38vw"/><span>03</span><small>ATMOSFER</small></div></div></section>

    <footer className="final light" id="son-sayfa"><div className="final-top"><span>07 • SON SAYFA</span><div><span>SAYI Nº01 / 2026</span><button onClick={()=>setMenuOpen(true)}>MENÜ</button></div></div><h2 data-reveal><span>BİR SONRA Kİ</span><span>HİKÂYE NE ?</span></h2><p data-reveal>Bir fikrin varsa, konuşalım.</p><div className="signature">Dilara Sargın</div><div className="contact">{["E-POSTA","INSTAGRAM","LINKEDIN","PINTEREST"].map(item=><a href="#" key={item} onClick={e=>e.preventDefault()}>{item}<span>→</span></a>)}</div></footer>
  </main>;
}
