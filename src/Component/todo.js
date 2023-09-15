
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert } from 'bootstrap';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../config/firebase"

export default function Todo() {
    const [inputList, setInputLlist] = useState("");
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEdtitItem, seIsEditItem] = useState(null);
    // const itemEvent = (e) => {
    //     ;
    //     setInputLlist(e.target.value);
    // };

    const ListOfItem = async () => {
        if (!inputList) {
            alert("plxxx fill Data")
        }
        else if (inputList && !toggleSubmit) {
            setItems(
                items.map((itemval) => {
                    if (itemval.id === isEdtitItem) {
                        return { ...itemval, name: inputList }
                    }
                    return itemval
                })
            )
            setToggleSubmit(true)
            setInputLlist("")
            seIsEditItem(null)
        }

        else {
            const allinputs = { id: Math.random().toString(36).slice(2), name: inputList }
            await setDoc(doc(firestore, "todes", allinputs.id), allinputs);
            setItems((oldItems) => {
                return [...oldItems, allinputs];
            });
            setInputLlist("")
        }
    }
    const deletItem = async (idex) => {
        console.log(9706);
        // console.log(id);
        await deleteDoc(doc(firestore, "todes", idex));
        const updateItem = items.filter((itemval) => idex !== itemval.id);
        setItems(updateItem)
    }
    const edtitItem = async (id) => {
        let newEditItem = items.find((itemval) => {
            return itemval.id === id
        });
        console.log(newEditItem);
        await setDoc(doc(firestore, "todes", newEditItem.id), newEditItem);
        setToggleSubmit(false)
        setInputLlist(newEditItem.name)
        seIsEditItem(id)
    }
    const removeall = () => {
        setItems([]);
    }
    const getDataFfromFirestore = async() => {
        let array=[]
        const querySnapshot = await getDocs(collection(firestore, "todes"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", );
  array.push(doc.data())
});
setItems(array)
    }
    useEffect(()=>{
        getDataFfromFirestore()
    },[])
    return (
        <>
            <div className="container bg-danger">
                <h2 className='text-center'>TODO LIST</h2>
                <div className="row">
                    <div className="col-8 offset-lg-2">
                        <div className="card m-5">

                            <div className="row m-2 ">
                                <div className="col-6 offset-lg-3">
                                    <div className="showitem">
                                        <input type="text" placeholder='Enter Data Here' onChange={(e) => setInputLlist(e.target.value)} value={inputList} />
                                        {
                                            toggleSubmit ? <button title='add' onClick={ListOfItem} className='bg-success rounded-circle'>+</button> :
                                                <button className='bg-primary  m-3 rounded-circle' title='updaTE' onClick={ListOfItem}>edit</button>
                                        }
                                    </div>

                                </div>
                            </div>
                            <br />
                            <div className='showitem'>

                                {
                                    items.map((itemval) => {
                                        return (
                                            <div className='each-item' key={itemval.id}>
                                                <li style={{ marginLeft: "200px" }}> {itemval.name}
                                                    <button className='bg-secondary  m-2 rounded-circle' onClick={() => edtitItem(itemval.id)}>edit</button>
                                                    <button className='bg-info  m-3 rounded-circle' onClick={() => deletItem(itemval.id)}>-</button></li>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <hr style={{ width: "70%", marginLeft: "15%" }} />
                            <div className="showitem">
                                <button className='btn border  rounded-circle' onClick={removeall} style={{ marginLeft: "250px", backgroundColor: "red" }}>Remove all</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
