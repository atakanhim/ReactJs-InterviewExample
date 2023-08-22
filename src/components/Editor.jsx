import { useState } from "react";

export default function Editor() {
  const [selectedText, setSelectedText] = useState('');
  const [selectedData, setSelectedData] = useState();
  const [containingDivId, setContainingDivId] = useState();

  const handleMouseDown = () => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);


  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    setSelectedText(selection.toString());
    console.log(selection.toString());
    setSelectedData(selection);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseLeave);
    const containingDiv = findContainingDiv(selection.anchorNode);
    const s = containingDiv ? containingDiv.id : '';
    setContainingDivId(s);

    console.log('Containing div ID:', s);

  };
  const findContainingDiv = (node) => {
    if (!node) return null;

    if (node.tagName === 'DIV' ||node.tagName === 'P'  ) {
      return node;
    } else {
      return findContainingDiv(node.parentNode);
    }
  };

  const handleMouseLeave = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseLeave);

  };

  var texts = ["h1", "h2", "h3", "paragragp",
    "bold", "italic", "strike", "left", "center", "right"];
  let btnOnClick = (e) => {
    let text = "Yapılacak olan işleme ait div = " + containingDivId + "\n Yapılacak İşlem = " + e.target.innerHTML;
    console.log(text);

  }
  function icerik1() {
    return "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero dolor, numquam repudiandae pariatur libero itaque nesciunt voluptate repellendus distinctio inventore minima nihil ratione impedit unde obcaecati? Quidem totam fuga dignissimos.";
  }
  function icerik2() {
    return "asdadadjsadsadsadsadadddddddadsadadaa asdasdasd asdasdsad asdadsad asdsadad asdadasda asdasdads.";
  }
  function icerik3() {
    return "aynen knaka ondan \n aynen kanka aaaaaaaaaaaaaaaaaaa  ";
  }
  return (
    <div className="flex items-center border flex-col p-3" >


      <div className="flex gap-2 justify-center flex-wrap border w-4/5">
        {texts.map((text, index) => (
          <button onClick={(e) => btnOnClick(e)} className="border p-3 bg-gray-light" key={index}>{text}</button>
        ))}
      </div>

      <div onMouseDown={handleMouseDown}>
        <div className="border mt-10 flex flex-col items-center gap-4"><h1 className="text-center text-2xl">for [ bold , italic , strike ] </h1> <div className="w-3/4 border" id="icerik1">{icerik1()}</div></div>
        <div className="border mt-10 flex flex-col items-center gap-4"><h1 className="text-center text-2xl">for [h1,h2,h3,paragragp,left,center,right]</h1> <p className=" w-10/12 border text-right"  id="icerik2">{icerik2()}</p></div>
      </div>
      <div id="icerik4" className="border mt-16"><h1 className="text-center text-2xl">for word</h1>
        <p>Seçilen metin: {selectedText}</p></div>
    </div>
  )
}
