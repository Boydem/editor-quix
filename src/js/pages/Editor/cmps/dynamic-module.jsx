import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ currModule, addMenuItems }) {
    if (!currModule) return <></>
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
