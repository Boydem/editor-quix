import { QuickAdd } from './modules/quick-add'

export function DynamicModule({ activeModule }) {
    console.log('activeModule:', activeModule)
    switch (activeModule) {
        case 'Quick add':
            return <QuickAdd />

        default:
            return <QuickAdd />
    }
}
