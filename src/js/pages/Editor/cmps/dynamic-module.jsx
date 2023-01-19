import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ currModule, addMenuItems }) {
<<<<<<< HEAD
    if (!currModule) return <></>
=======
    if (!currModule) return
    console.log(currModule)
>>>>>>> 4cf46eed45de8bd90551b2f415b3b9bf79bf21fb
    if (addMenuItems[1].includes(currModule)) {
        return <CmpFractions activeModule={currModule} />
    }

    // switch (activeModule) {
    //     case 'Quick add':
    //         return <QuickAdd />

    //     default:
    //         return <QuickAdd activeModule={activeModule} />
    // }
}
