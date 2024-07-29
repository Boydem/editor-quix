import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ activeMenuItem, addMenuItems }) {
    if (!activeMenuItem) return
    if (addMenuItems.includes(activeMenuItem)) {
        return <CmpFractions activeMenuItem={activeMenuItem} />
    }

}
