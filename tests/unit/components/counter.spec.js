import {shallowMount} from "@vue/test-utils";
import Counter from "@/components/Counter";
describe('Counter Component',()=>{
    /*test('Debe ser identico al snapshot',()=>{
        const wrapper = shallowMount(Counter)
        expect(wrapper.html()).toMatchSnapshot()
    })*/

    let wrapper;
    beforeEach(()=>{
        wrapper = shallowMount(Counter)
    })
    test('h2 debe ser "Counter"',()=>{
        expect( wrapper.find('h2').exists()).toBeTruthy()
        const h2 = wrapper.find('h2')
        expect(h2.text()).toBe('Counter')
    })

    test('debe ser 100 en p',()=>{
        expect( wrapper.findAll('p')).toBeTruthy()
        const p = wrapper.findAll('p')
        expect(p[1].text()).toBe('100')
    })

    test('debe incrementar',async ()=>{
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        await increaseBtn.trigger('click')
        let value = wrapper.find('[data-testid="counter"]').text()
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('99')
    })

    test('verificar el valor por defecto',()=>{
        const start =  wrapper.props('start')
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start)
    })

    test('mostrar prop title',()=>{
        const title = 'Hola Mundo'
        const wrapper = shallowMount(Counter,{
            props : {
                title
            }
        })
        expect(wrapper.find('h2').text()).toBe(title)
    })
})