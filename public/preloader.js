window.addEventListener("DOMContentLoaded",()=>{
    const replaceText = (selector,text) =>{
        const element = document.getElementById(selector)
        console.log(element)
        if(element) element.innerText = text;
    };

    for(const dependency of ["chrome","noe","electron"]){
        replaceText(`${dependency}-version`, process.version[dependency])
    }
})