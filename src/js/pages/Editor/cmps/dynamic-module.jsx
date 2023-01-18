import { CmpFractions } from './modules/cmp-fractions'

export function DynamicModule({ activeModule, modulesMenuItems }) {
    console.log('activeModule:', activeModule)

    if (modulesMenuItems[1].includes(activeModule)) {
        return <CmpFractions activeModule={activeModule} />
    }

    // switch (activeModule) {
    //     case 'Quick add':
    //         return <QuickAdd />

    //     default:
    //         return <QuickAdd activeModule={activeModule} />
    // }
}
