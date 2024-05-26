//const saveAs = require("./FileSaver");

const generatePDF=async(name)=>{
    const {PDFDocument,rgb}=PDFLib;
    const exBytes=await fetch("./cert.pdf").then((res)=>{
        return res.arrayBuffer();
    });
    const exFont=await fetch("./AlexBrush-Regular.ttf").then(res=>{
        return res.arrayBuffer()
    });
    const pdfDoc= await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const font=await pdfDoc.embedFont(exFont); 
    const pages=pdfDoc.getPages();
    const firstPage=pages[0];
    /*firstPg.drawText(name,{
          x:100,
          y:400,
          size: 58,
          textAlign: "center"
    })*/
    const { width, height } = firstPage.getSize();

        const rectX = 190;
        const rectY = 300;
        const rectWidth = 200;
        const rectHeight = 100;

       
        firstPage.drawRectangle({
          x: rectX,
          y: rectY,
          width: rectWidth,
          height: rectHeight,
          color: rgb(0,0,0),
          opacity: 0,
        });

       
        //const font = await pdfDoc.embedFont(exFont);
        const fontSize = 58;
        const text = name;

       
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = font.heightAtSize(fontSize);

       
        const textX = rectX + (rectWidth - textWidth) / 2;
        const textY = rectY + (rectHeight - textHeight) / 2 + textHeight;

        
        firstPage.drawText(text, {
          x: textX,
          y: textY,
          size: fontSize,
          font: font,
          color: rgb(0.392, 0.706, 0.863)
        })
      //  window.open(uri)
    const  uri= await pdfDoc.saveAsBase64({dataUri: true})
    // document.querySelector("#mypdf").src=uri;
    saveAs(uri,"NSS Certificate.pdf",{autoBom:true});
};
const submitBtn=document.getElementById("submit")
const inputVal=document.querySelector("#name")
submitBtn.addEventListener("click",()=>{
  const val=inputVal.value;
  generatePDF(val);
});
