import{a as j}from"/myst_assets_folder/_shared/chunk-PSIFSBYU.js";import{a as J}from"/myst_assets_folder/_shared/chunk-2RRX75WA.js";import{a as K}from"/myst_assets_folder/_shared/chunk-GS7QPNKU.js";import"/myst_assets_folder/_shared/chunk-D4I4FMU3.js";import"/myst_assets_folder/_shared/chunk-LHWWMMIN.js";import"/myst_assets_folder/_shared/chunk-PDV5BDST.js";import"/myst_assets_folder/_shared/chunk-B7PDIXGE.js";import"/myst_assets_folder/_shared/chunk-536FPRQA.js";import"/myst_assets_folder/_shared/chunk-MB4EJF2W.js";import"/myst_assets_folder/_shared/chunk-5GONE7L7.js";import"/myst_assets_folder/_shared/chunk-ILONG3JM.js";import"/myst_assets_folder/_shared/chunk-JMV5HLZN.js";import{k as q,l as H}from"/myst_assets_folder/_shared/chunk-H5UGLSR3.js";import"/myst_assets_folder/_shared/chunk-ILX2UBHN.js";import{L as W,P as M,Q as P,R,S as I,T as L,U as N,V as B,W as U,q as O}from"/myst_assets_folder/_shared/chunk-JU57NILB.js";import{b as o,d as g,o as V,t as C,w as Z}from"/myst_assets_folder/_shared/chunk-7DW7L33J.js";import"/myst_assets_folder/_shared/chunk-FZ2S7OYD.js";import"/myst_assets_folder/_shared/chunk-JEM6JXYA.js";import"/myst_assets_folder/_shared/chunk-34XIY2DH.js";import"/myst_assets_folder/_shared/chunk-KQM5FBHR.js";import"/myst_assets_folder/_shared/chunk-OZE3FFNP.js";var Q=O.pie,D={sections:new Map,showData:!1,config:Q},f=D.sections,y=D.showData,ne=structuredClone(Q),se=o(()=>structuredClone(ne),"getConfig"),ce=o(()=>{f=new Map,y=D.showData,M()},"clear"),de=o(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);f.has(e)||(f.set(e,a),g.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),pe=o(()=>f,"getSections"),ge=o(e=>{y=e},"setShowData"),fe=o(()=>y,"getShowData"),X={getConfig:se,clear:ce,setDiagramTitle:N,getDiagramTitle:B,setAccTitle:P,getAccTitle:R,setAccDescription:I,getAccDescription:L,addSection:de,getSections:pe,setShowData:ge,getShowData:fe},ue=o((e,a)=>{J(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),me={parse:o(async e=>{let a=await K("pie",e);g.debug(a),ue(a,X)},"parse")},he=o(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=he,Se=o(e=>{let a=[...e.values()].reduce((r,l)=>r+l,0),$=[...e.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return Z().value(r=>r.value)($)},"createPieArcs"),xe=o((e,a,$,T)=>{g.debug(`rendering pie chart
`+e);let r=T.db,l=U(),A=H(r.getConfig(),l.pie),b=40,n=18,d=4,s=450,u=s,m=j(a),c=m.append("g");c.attr("transform","translate("+u/2+","+s/2+")");let{themeVariables:i}=l,[E]=q(i.pieOuterStrokeWidth);E??=2;let _=A.textPosition,p=Math.min(u,s)/2-b,Y=C().innerRadius(0).outerRadius(p),ee=C().innerRadius(p*_).outerRadius(p*_);c.append("circle").attr("cx",0).attr("cy",0).attr("r",p+E/2).attr("class","pieOuterCircle");let h=r.getSections(),te=Se(h),ae=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12],v=0;h.forEach(t=>{v+=t});let k=te.filter(t=>(t.data.value/v*100).toFixed(0)!=="0"),S=V(ae);c.selectAll("mySlices").data(k).enter().append("path").attr("d",Y).attr("fill",t=>S(t.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(k).enter().append("text").text(t=>(t.data.value/v*100).toFixed(0)+"%").attr("transform",t=>"translate("+ee.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-(s-50)/2).attr("class","pieTitleText");let z=[...h.entries()].map(([t,w])=>({label:t,value:w})),x=c.selectAll(".legend").data(z).enter().append("g").attr("class","legend").attr("transform",(t,w)=>{let G=n+d,ie=G*z.length/2,oe=12*n,le=w*G-ie;return"translate("+oe+","+le+")"});x.append("rect").attr("width",n).attr("height",n).style("fill",t=>S(t.label)).style("stroke",t=>S(t.label)),x.append("text").attr("x",n+d).attr("y",n-d).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);let re=Math.max(...x.selectAll("text").nodes().map(t=>t?.getBoundingClientRect().width??0)),F=u+b+n+d+re;m.attr("viewBox",`0 0 ${F} ${s}`),W(m,s,F,A.useMaxWidth)},"draw"),we={draw:xe},Ee={parser:me,db:X,renderer:we,styles:ve};export{Ee as diagram};
