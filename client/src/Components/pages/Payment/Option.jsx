import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from "react-dom"
import Api from '../Api'


const Option = () => {
    const navigate = useNavigate()
    const customer = useSelector((state) => state.reduxSlice.customerInfo)
    // redirect#########
    useEffect(() => {
        if (customer?.isEamilVerify === false) {
            navigate("/home")
        }
    }, [])
    // redirect######### 
    //###### payment option ###
    //###### payment api ###
    //###### customer info ###
    //###### service info ####
    return (
        <>
            <div>Option</div>
            <div>payment api</div>
            <div>redirect</div>
        </>
    )
}

export default Option