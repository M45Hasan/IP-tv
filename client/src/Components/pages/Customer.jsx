import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-dom"
import { useDispatch, useSelector } from 'react-redux'
import Api from './Api'

const Customer = () => {
    const navigate = useNavigate()
    const customer = useSelector((state) => state.reduxSlice.customerInfo)

    //#### data get####
    //#### data get end####
    //####### useEfeect start ####
    //####### useEfeect end####
    //##### log###
    return (
        <>
            <div>Customer </div>
            <div>formdata </div>
            <div>email verify  </div>
        </>
    )
}

export default Customer