import React, { useState } from 'react';
import picNoermalArrow from "../../static/images/pic-noermal-arrow.png";
import picSelectedArrow from '../../static/images/pic-selected-arrow.png'
import './check-button.css';
export default function CheckButton(props) {
    const { data } = props;
    const children = data.children || [];

    const [selectedList, setSelecetdList] = useState(getArrayOfFalse(children.length));
    const [allSelected, setAllSelected] = useState(false);
    function buttomClick(item, index) {
        if (allSelected) return;
        let arr = [...selectedList];
        arr[index] = !arr[index];
        setSelecetdList(arr);
        let result = {
            isAll: false,
            parent: data.key,
            tab: item.key,
            selected: arr[index]
        }
        props.onChange(result);
    }

    function allIsSelected(e) {
        if (!allSelected) {
            let arr = [...selectedList].map(item => false);
            setSelecetdList(arr)
        }
        setAllSelected(!allSelected);
        let result = {
            isAll: true,
            tab: data.key,
            selected: !allSelected
        }
        props.onChange(result);
    }


    return (
        <div className="button-group">
            <div onClick={allIsSelected} className="checkbox-button">
                <img src={allSelected ? picSelectedArrow : picNoermalArrow}></img>
                <span className={allSelected ? "text selected-text" : "text"}>{data.key}</span>
            </div>
            <div className="item-wrap">
                {
                    children.map((item, index) => <div onClick={buttomClick.bind(this, item, index)} className={selectedList[index] ? 'button button-selected' : 'button'} key={item.key}>{item.key}</div>)
                }
            </div>

        </div>
    )
}

function getArrayOfFalse(length) {
    let index = 0;
    const result = [];
    while (index < length) {
        result.push(false);
        index++;
    }
    return result;
}