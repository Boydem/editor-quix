import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ activeMenuItem, addMenuItems }) {
    if (!activeMenuItem) return
    if (addMenuItems.includes(activeMenuItem)) {
        return <CmpFractions activeMenuItem={activeMenuItem} />
    }

    // switch (activeModule) {
    //     case 'Quick add':
    //         return <QuickAdd />

    //     default:
    //         return <QuickAdd activeModule={activeModule} />
    // }
}
