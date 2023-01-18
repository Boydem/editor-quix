import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ activeModule, addModulesMenuItems }) {
    console.log('activeModule:', activeModule)

    if (addModulesMenuItems[1].includes(activeModule)) {
        return <CmpFractions activeModule={activeModule} />
    }

    // switch (activeModule) {
    //     case 'Quick add':
    //         return <QuickAdd />

    //     default:
    //         return <QuickAdd activeModule={activeModule} />
    // }
}
