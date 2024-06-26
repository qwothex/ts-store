import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from "react-redux"
import { actions as userActions } from '../store/slices/userSlice'
import { actions as productActions } from '../store/slices/productSlice'

const rootActions = {
    ...userActions,
    ...productActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}