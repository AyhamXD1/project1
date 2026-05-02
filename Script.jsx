const { useState, useMemo } = React;

const BOOKS = [
  {id:1,title:"UML",author:"د.حنين حجازي",genre:"هندسة البرمجيات",year:2015,pages:320},
  {id:2,title:"WEB",author:"د.بشار شبول",genre:"هندسة البرمجيات",year:2026,pages:280},
  {id:3,title:"Java",author:"د.حنين حجازي",genre:"تكنولوجيا المعلومات",year:2018,pages:350},
  {id:4,title:"C++",author:"د.ياسر قواسمة",genre:"تكنولوجيا المعلومات",year:2017,pages:400},
  {id:5,title:"SoftWare Quality",author:"د.محمد زعرور",genre:" هندسة البرمجيات",year:2019,pages:290},
  {id:6,title:"Testing",author:"د.محمد زعرور",genre:"هندسة البرمجيات",year:2020,pages:310},
  {id:7,title:"OS",author:"د.سحر العدوان",genre:"علم الحاسوب",year:2021,pages:370},
  {id:8,title:"Algorithm",author:"د.سحر العدوان",genre:"علم الحاسوب",year:2016,pages:330},
  {id:9,title:"Data Structure",author:"د.علاء الدين",genre:"انظمة المعلومات الحاسوبية",year:2014,pages:300},
  {id:10,title:"OOP",author:"د.حنين حجازي",genre:"هندسة البرمجيات",year:2019,pages:360},
  {id:11,title:"Liner",author:"د.عبدالله شحادة",genre:"رياضيات",year:2013,pages:250},
  {id:12,title:"Data Base",author:"د.فيروزة",genre:"علم البيانات والذكاء الاصطناعي",year:2022,pages:380},
  {id:13,title:"SoftWare Design",author:"د.عبدالرحمن الغويري",genre:"هندسة البرمجيات",year:2018,pages:340},
  {id:14,title:"Software documentation",author:"د.علاء بعارة",genre:"هندسة البرمجيات",year:2020,pages:300},
  {id:15,title:"SoftWare Fundamentals ",author:"د.مريم ",genre:"تكنولوجيا المعلومات",year:2017,pages:320},
];

const GENRES = ["الكل","هندسة البرمجيات","تكنولوجيا المعلومات","علم الحاسوب","انظمة المعلومات الحاسوبية","علم البيانات والذكاء الاصطناعي","رياضيات"];
const SORTS = [
  {value:"year-desc",label:"الأحدث"},
  {value:"year-asc",label:"الأقدم"},
  {value:"title-asc",label:"الاسم أ-ي"},
  {value:"pages-desc",label:"الأطول"},
  {value:"pages-asc",label:"الأقصر"},
];

function BookCard({book, delay}){
  const [hov,setHov]=useState(false);
  return <div
    className="book-card"
    onMouseEnter={()=>setHov(true)}
    onMouseLeave={()=>setHov(false)}
    style={{
      background:"var(--paper)",
      border:"1px solid var(--border-strong)",
      borderRadius:10,
      padding:"1.3rem",
      display:"flex",flexDirection:"column",gap:10,
      transition:"transform 0.2s,box-shadow 0.2s",
      transform:hov?"translateY(-5px) rotate(-0.5deg)":"none",
      boxShadow:hov?"4px 6px 20px var(--shadow)":"2px 3px 8px var(--shadow)",
      borderRight:"4px solid "+(hov?"var(--accent)":"var(--brown)"),
      animationDelay:delay+"ms",
      cursor:"default",
    }}>
    <div style={{fontSize:32,textAlign:"center",lineHeight:1,marginBottom:2}}>{book.emoji}</div>
    <div>
      <div style={{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:"var(--ink)",lineHeight:1.4,marginBottom:4}}>{book.title}</div>
      <div style={{fontSize:12,color:"var(--ink-light)",fontStyle:"italic"}}>{book.author}</div>
    </div>
    <Stars rating={book.rating}/>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(92,61,30,0.08)",color:"var(--brown)",borderRadius:4,border:"1px solid var(--border-strong)",fontWeight:500}}>{book.genre}</span>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(192,57,43,0.07)",color:"var(--accent)",borderRadius:4,border:"1px solid rgba(192,57,43,0.2)"}}>{book.year}</span>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(92,61,30,0.05)",color:"var(--ink-light)",borderRadius:4}}>{book.pages} صفحة</span>
    </div>
    <div style={{fontSize:11,color:"var(--ink-light)",borderTop:"1px dashed var(--border)",paddingTop:8,display:"flex",flexDirection:"column",gap:3}}>
    </div>
  </div>;
}

function Header({page, setPage}){
  const [menuOpen,setMenuOpen]=useState(false);
  const navItems=[
    {id:"home",label:" الكتب"},
    {id:"login",label:"دخول"},
    {id:"register",label:"تسجيل"},
  ];
  return <header style={{
    background:"rgba(245,240,232,0.97)",backdropFilter:"blur(8px)",
    borderBottom:"2px solid var(--border-strong)",
    position:"sticky",top:0,zIndex:100,
  }}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 1.2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:62}}>
      <div
        onClick={()=>{setPage("home");setMenuOpen(false)}}
        style={{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:"var(--brown)",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:26}}></span> 
      </div>
      <nav className="desktop-nav" style={{display:"flex",gap:2}}>
        {navItems.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{
            background:"none",border:"none",padding:"6px 14px",borderRadius:6,
            fontSize:13,fontWeight:500,color:page===n.id?"var(--accent)":"var(--ink-light)",
            borderBottom:page===n.id?"2px solid var(--accent)":"2px solid transparent",
            transition:"color 0.2s",
          }}>{n.label}</button>
        ))}
      </nav>
      <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{
        display:"none",background:"none",border:"1px solid var(--border-strong)",
        borderRadius:6,padding:"6px 12px",color:"var(--brown)",fontSize:18,lineHeight:1
      }}>{menuOpen?"✕":"☰"}</button>
    </div>
    {menuOpen&&<div style={{background:"var(--paper)",borderTop:"1px solid var(--border)",padding:"0.5rem 0"}}>
      {navItems.map(n=>(
        <button key={n.id} onClick={()=>{setPage(n.id);setMenuOpen(false)}} style={{
          display:"block",width:"100%",background:"none",border:"none",
          padding:"12px 1.5rem",textAlign:"right",fontSize:15,
          color:page===n.id?"var(--accent)":"var(--ink)"
        }}>{n.label}</button>
      ))}
    </div>}
  </header>;
}

function HomePage(){
  const [search,setSearch]=useState("");
  const [genre,setGenre]=useState("الكل");
  const [sort,setSort]=useState("rating-desc");

  const displayed = useMemo(()=>{
    let arr=[...BOOKS];
    if(search.trim()){
      const q=search.toLowerCase();
      arr=arr.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q));
    }
    if(genre!=="الكل") arr=arr.filter(b=>b.genre===genre);
    const [key,dir]=sort.split("-");
    arr.sort((a,b)=>{
      let v=key==="title"?a[key].localeCompare(b[key]):a[key]-b[key];
      return dir==="desc"?-v:v;
    });
    return arr;
  },[search,genre,sort]);

  return <main style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1.2rem"}}>
    <div style={{marginBottom:"2rem",borderBottom:"1px dashed var(--border-strong)",paddingBottom:"1.5rem"}}>
      <h1 style={{fontFamily:"'Lora',serif",fontSize:34,fontWeight:700,color:"var(--ink)",marginBottom:6}}>
        المواد <span style={{color:"var(--accent)"}}>المتوفرة</span>
      </h1>
     
    </div>

    <div style={{display:"flex",gap:10,marginBottom:"1.5rem",flexWrap:"wrap"}}>
      <input
        style={{flex:"1 1 220px",minWidth:0}}
        placeholder=" ابحث..."
        value={search} onChange={e=>setSearch(e.target.value)}
      />
      <select value={genre} onChange={e=>setGenre(e.target.value)} style={{flex:"0 1 160px"}}>
        {GENRES.map(g=><option key={g} value={g}>{g}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{flex:"0 1 160px"}}>
        {SORTS.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>

    {displayed.length===0
      ? <div style={{textAlign:"center",padding:"5rem",color:"var(--ink-light)"}}>
          <div style={{fontSize:48,marginBottom:16}}></div>
          <p style={{fontSize:16,fontFamily:"'Lora',serif"}}>غير متوفر...</p>
        </div>
      : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"1.1rem"}}>
          {displayed.map((b,i)=><BookCard key={b.id} book={b} delay={i*40}/>)}
        </div>
    }
  </main>;
}

function FormPage({title,emoji,fields,btnLabel,btnBg,note}){
  const inp={
    display:"block",width:"100%",marginBottom:14,padding:"10px 14px",
    borderRadius:6,background:"var(--cream)",border:"1px solid var(--border-strong)",
    color:"var(--ink)",fontSize:14,fontFamily:"'Tajawal',sans-serif",outline:"none"
  };
  return <main style={{maxWidth:440,margin:"4rem auto",padding:"0 1.2rem"}}>
    <div style={{
      background:"var(--paper)",border:"1px solid var(--border-strong)",borderRadius:12,
      padding:"2rem",boxShadow:"4px 6px 20px var(--shadow)",
      borderTop:`3px solid ${btnBg}`
    }}>
      <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
        <div style={{fontSize:40}}>{}</div>
        <h2 style={{fontFamily:"'Lora',serif",fontSize:24,color:"var(--ink)",marginTop:10}}>{title}</h2>
      </div>
      {fields.map((f,i)=>(
        <div key={i}>
          <label style={{fontSize:12,color:"var(--ink-light)",display:"block",marginBottom:4}}>{f.label}</label>
          <input type={f.type||"text"} placeholder={f.placeholder||""} style={inp}/>
        </div>
      ))}
      <button style={{
        width:"100%",padding:"12px",background:btnBg,
        border:"none",borderRadius:6,color:"#fff",fontWeight:700,fontSize:15,
        fontFamily:"'Tajawal',sans-serif",marginTop:6,letterSpacing:1
      }}>{btnLabel}</button>
      <p style={{textAlign:"center",fontSize:12,color:"var(--ink-light)",marginTop:14,lineHeight:1.6,fontStyle:"italic"}}>{note}</p>
    </div>
  </main>;
}

function AboutPage(){
  const team=[];
  const stats=[];
  return <main style={{maxWidth:760,margin:"0 auto",padding:"3rem 1.2rem"}}>
    <h1 style={{fontFamily:"'Lora',serif",fontSize:34,color:"var(--ink)",marginBottom:16}}>
        <span style={{color:"var(--accent)"}}></span>
    </h1>
    <p style={{color:"var(--ink-light)",lineHeight:1.9,fontSize:15,marginBottom:"2.5rem"}}>
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
      {stats.map((s,i)=>(
        <div key={i} style={{background:"var(--paper)",border:"1px solid var(--border-strong)",borderRadius:10,padding:"1.4rem",textAlign:"center",boxShadow:"2px 3px 8px var(--shadow)"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:32,color:"var(--accent)",fontWeight:700}}>{s.n}</div>
          <div style={{fontSize:13,color:"var(--ink-light)",marginTop:6}}>{s.l}</div>
        </div>
      ))}
    </div>
    <h2 style={{fontFamily:"'Lora',serif",fontSize:22,color:"var(--ink)",marginBottom:"1rem"}}></h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
      {team.map((m,i)=>(
        <div key={i} style={{background:"var(--paper)",border:"1px solid var(--border-strong)",borderRadius:10,padding:"1.2rem",display:"flex",alignItems:"center",gap:12,boxShadow:"2px 3px 8px var(--shadow)"}}>
          <div style={{fontSize:30}}>{m.emoji}</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"var(--ink)"}}>{m.name}</div>
            <div style={{fontSize:12,color:"var(--ink-light)",marginTop:2}}>{m.role}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{padding:"1.5rem",background:"var(--paper)",borderRadius:10,border:"1px solid var(--border-strong)",borderRight:"4px solid var(--brown)",boxShadow:"2px 3px 8px var(--shadow)"}}>
      <h3 style={{color:"var(--brown)",fontSize:14,marginBottom:10}}></h3>
      <p style={{fontSize:13,color:"var(--ink-light)",lineHeight:2}}>
      </p>
    </div>
  </main>;
}

function App(){
  const [page,setPage]=useState("home");
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <Header page={page} setPage={setPage}/>
    <div style={{flex:1}}>
      {page==="home"&&<HomePage/>}
      {page==="login"&&<FormPage
        title="تسجيل الدخول"  btnLabel="دخول" btnBg="var(--brown)"
        fields={[
          {label:"البريد الإلكتروني",type:"email",placeholder:"example@email.com"},
          {label:"كلمة المرور",type:"password",placeholder:"••••••••"}
        ]}
      />}
      {page==="register"&&<FormPage
        title="إنشاء حساب" btnLabel="تسجيل" btnBg="var(--accent)"
        fields={[
          {label:"الاسم الكامل",placeholder:"أسمك"},
          {label:"البريد الإلكتروني",type:"email",placeholder:"example@email.com"},
          {label:"كلمة المرور",type:"password"},
          {label:"تأكيد كلمة المرور",type:"password"}
        ]}
      />}
      {page==="about"&&<AboutPage/>}
    </div>
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
