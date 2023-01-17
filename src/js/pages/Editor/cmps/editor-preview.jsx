import DynamicCmp from './dynamic-cmp'
import { getWap1Template } from '../../../wap-templates/wap-template-1/wap-1-template'
import data from '../../../wap-templates/wap-template-1/wap-1-template-test.json'
import data2 from '../../../wap-templates/wap-template-1/wap-1-template-test2.json'
// import { useState, useEffect } from 'react'

export function EditorPreview() {
    return (
        <div className='full'>
            {getWap1Template().map(c => {
                return <DynamicCmp cmp={c} key={c.id} />
            })}
        </div>
    )

    // return (
    //     <>
    //         <DynamicCmp cmp={data} />
    //         <DynamicCmp cmp={data2} />
    //     </>
    // )
}
