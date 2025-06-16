import { useRef, useEffect } from "react"
import Input from "../common/Input/Input";

const AutoResizeTextArea = ({ handleChangeInput, prevData, text, style, disabled = false }) => {
    const textareaRef = useRef(null);
    function handleChangeTextArea(e) {
        const textarea = textareaRef.current;
        handleChangeInput(e);
        if (textarea) {
            textarea.style.height = 'auto';
            if (textarea.scrollHeight >= textarea.clientHeight) {
                textarea.style.height = `${textarea.scrollHeight}px`;
            } else {
                textarea.style.height = '30px'; // Set minimum height to 30px
            }
        }
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            if (textarea.scrollHeight >= textarea.clientHeight) {
                textarea.style.height = `${textarea.scrollHeight}px`;
            } else {
                textarea.style.height = '30px'; // Set minimum height to 30px
            }
        }
    },[])

    return (
        <>
            
            {disabled ? 
                <textarea id="textarea" ref={textareaRef} value={text ?? prevData.description} style={style} />
                :
                <>
                    <Input type={"hidden"} label={"Информация о предприятии"} isRequired={prevData?.description?.isRequired} />
                    <textarea ref={textareaRef} placeholder={"ОАО «Минский автомобильный завод» (МАЗ) — управляющая компания холдинга «БЕЛАВТОМАЗ» (бел. Мінскі аўтамабільны завод)"}
                        name={"description"} value={text ?? prevData?.description?.value} isRequired={prevData?.description?.isRequired} onChange={(e) => { handleChangeTextArea(e) }} />
                    </>
            }
           
        </>
    )
}

export default AutoResizeTextArea;