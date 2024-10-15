import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from "react-redux"
import { actions as userActions } from '../store/slices/userSlice'
import { actions as productActions } from '../store/slices/productSlice'
import { actions as orderActions } from '../store/slices/orderSlice'

const rootActions = {
    ...userActions,
    ...productActions,
    ...orderActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}