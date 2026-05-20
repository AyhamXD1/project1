const { useState, useMemo, useEffect } = React;

// رابط الباك إند الخاص بك على ريندر
const API_URL = "https://project2-1kr4.onrender.com/api";

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
    <div>
      <div style={{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:"var(--ink)",lineHeight:1.4,marginBottom:4}}>{book.title}</div>
      <div style={{fontSize:12,color:"var(--ink-light)",fontStyle:"italic"}}>{book.doctor || book.author}</div>
    </div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(92,61,30,0.08)",color:"var(--brown)",borderRadius:4,border:"1px solid var(--border-strong)",fontWeight:500}}>{book.genre}</span>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(192,57,43,0.07)",color:"var(--accent)",borderRadius:4,border:"1px solid rgba(192,57,43,0.2)"}}>{book.year}</span>
      <span style={{fontSize:11,padding:"3px 9px",background:"rgba(92,61,30,0.05)",color:"var(--ink-light)",borderRadius:4}}>{book.pages} صفحة</span>
    </div>
  </div>;
}

function Header({page, setPage, user, onLogout}){
  const [menuOpen,setMenuOpen]=useState(false);
  return <header style={{
    background:"rgba(245,240,232,0.97)",backdropFilter:"blur(8px)",
    borderBottom:"2px solid var(--border-strong)",
    position:"sticky",top:0,zIndex:100,
  }}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 1.2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:62}}>
      <div onClick={()=>{setPage("home");setMenuOpen(false)}} style={{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:"var(--brown)",cursor:"pointer"}}>
        <span>مكتبة الكتب</span> 
      </div>
      <nav className="desktop-nav" style={{display:"flex",gap:2}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",padding:"6px 14px",fontSize:13,color:page==="home"?"var(--accent)":"var(--ink-light)",borderBottom:page==="home"?"2px solid var(--accent)":"2px solid transparent"}}>الكتب</button>
        {!user ? (
          <>
            <button onClick={()=>setPage("login")} style={{background:"none",border:"none",padding:"6px 14px",fontSize:13,color:page==="login"?"var(--accent)":"var(--ink-light)",borderBottom:page==="login"?"2px solid var(--accent)":"2px solid transparent"}}>دخول</button>
            <button onClick={()=>setPage("register")} style={{background:"none",border:"none",padding:"6px 14px",fontSize:13,color:page==="register"?"var(--accent)":"var(--ink-light)",borderBottom:page==="register"?"2px solid var(--accent)":"2px solid transparent"}}>تسجيل</button>
          </>
        ) : (
          <button onClick={onLogout} style={{background:"none",border:"none",padding:"6px 14px",fontSize:13,color:"red"}}>خروج ({user.username || 'المستخدم'})</button>
        )}
      </nav>
    </div>
  </header>;
}

function HomePage(){
  const [books, setBooks] = useState([]);
  const [search,setSearch]=useState("");
  const [genre,setGenre]=useState("الكل");
  const [sort,setSort]=useState("year-desc");
  const [loading, setLoading] = useState(true);

  // جلب الكتب الحية من الباك إند المرفوع
  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ في جلب البيانات:", err);
        setLoading(false);
      });
  }, []);

  const displayed = useMemo(()=>{
    let arr=[...books];
    if(search.trim()){
      const q=search.toLowerCase();
      arr=arr.filter(b=>b.title.toLowerCase().includes(q)||(b.doctor && b.doctor.toLowerCase().includes(q)));
    }
    if(genre!=="الكل") arr=arr.filter(b=>b.genre===genre);
    const [key,dir]=sort.split("-");
    arr.sort((a,b)=>{
      let v=key==="title"?a[key].localeCompare(b[key]):a[key]-b[key];
      return dir==="desc"?-v:v;
    });
    return arr;
  },[books,search,genre,sort]);

  if (loading) return <div style={{textAlign:"center", padding:"5rem", fontFamily:"Tajawal"}}>جاري تحميل الكتب من السيرفر...</div>;

  return <main style={{maxWidth:1100,margin:"0 auto",padding:"2rem 1.2rem"}}>
    <div style={{marginBottom:"2rem",borderBottom:"1px dashed var(--border-strong)",paddingBottom:"1.5rem"}}>
      <h1 style={{fontFamily:"'Lora',serif",fontSize:34,fontWeight:700,color:"var(--ink)",marginBottom:6}}>
        المواد <span style={{color:"var(--accent)"}}>المتوفرة حياً</span>
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
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <p style={{fontSize:16,fontFamily:"'Lora',serif"}}>لا توجد كتب متوفرة مطابقة للبحث.</p>
        </div>
      : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"1.1rem"}}>
          {displayed.map((b,i)=><BookCard key={b._id || b.id} book={b} delay={i*40}/>)}
        </div>
    }
  </main>;
}

function FormPage({title, fields, btnLabel, btnBg, onSubmit, errorMessage}){
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inp={
    display:"block",width:"100%",marginBottom:14,padding:"10px 14px",
    borderRadius:6,background:"var(--cream)",border:"1px solid var(--border-strong)",
    color:"var(--ink)",fontSize:14,fontFamily:"'Tajawal',sans-serif",outline:"none"
  };

  return <main style={{maxWidth:440,margin:"4rem auto",padding:"0 1.2rem"}}>
    <form onSubmit={handleSubmit} style={{
      background:"var(--paper)",border:"1px solid var(--border-strong)",borderRadius:12,
      padding:"2rem",boxShadow:"4px 6px 20px var(--shadow)",
      borderTop:`3px solid ${btnBg}`
    }}>
      <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
        <h2 style={{fontFamily:"'Lora',serif",fontSize:24,color:"var(--ink)",marginTop:10}}>{title}</h2>
      </div>
      {errorMessage && <div style={{color:"red", fontSize:13, marginBottom:10, textAlign:"center"}}>{errorMessage}</div>}
      {fields.map((f,i)=>(
        <div key={i}>
          <label style={{fontSize:12,color:"var(--ink-light)",display:"block",marginBottom:4}}>{f.label}</label>
          <input 
            type={f.type||"text"} 
            placeholder={f.placeholder||""} 
            style={inp}
            required
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        </div>
      ))}
      <button type="submit" style={{
        width:"100%",padding:"12px",background:btnBg,
        border:"none",borderRadius:6,color:"#fff",fontWeight:700,fontSize:15,
        fontFamily:"'Tajawal',sans-serif",marginTop:6,letterSpacing:1
      }}>{btnLabel}</button>
    </form>
  </main>;
}

function App(){
  const [page,setPage]=useState("home");
  const [user, setUser]=useState(null);
  const [error, setError]=useState("");

  const handleRegister = (data) => {
    setError("");
    if(data.password !== data.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username: data.username, email: data.email, password: data.password})
    })
    .then(res => res.json())
    .then(resData => {
      if(resData.error) throw new Error(resData.error);
      alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
      setPage("login");
    })
    .catch(err => setError(err.message || "فشلت عملية إنشاء الحساب"));
  };

  const handleLogin = (data) => {
    setError("");
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => {
      if(resData.error) throw new Error(resData.error);
      setUser(resData.user || {username: data.email});
      alert("تم تسجيل الدخول بنجاح!");
      setPage("home");
    })
    .catch(err => setError(err.message || "فشل تسجيل الدخول، تحقق من البيانات"));
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <Header page={page} setPage={setPage} user={user} onLogout={handleLogout}/>
    <div style={{flex:1}}>
      {page==="home"&&<HomePage/>}
      {page==="login"&&<FormPage
        title="تسجيل الدخول" btnLabel="دخول" btnBg="var(--brown)"
        errorMessage={error}
        onSubmit={handleLogin}
        fields={[
          {label:"البريد الإلكتروني",type:"email",placeholder:"example@email.com", name:"email"},
          {label:"كلمة المرور",type:"password",placeholder:"••••••••", name:"password"}
        ]}
      />}
      {page==="register"&&<FormPage
        title="إنشاء حساب" btnLabel="تسجيل" btnBg="var(--accent)"
        errorMessage={error}
        onSubmit={handleRegister}
        fields={[
          {label:"الاسم الكامل",placeholder:"أسمك", name:"username"},
          {label:"البريد الإلكتروني",type:"email",placeholder:"example@email.com", name:"email"},
          {label:"كلمة المرور",type:"password", name:"password"},
          {label:"تأكيد كلمة المرور",type:"password", name:"confirmPassword"}
        ]}
      />}
    </div>
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
