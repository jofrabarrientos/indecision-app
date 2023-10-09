import {shallowMount} from "@vue/test-utils";
import Indecision from "@/components/Indecision";
describe('Indecision Component',()=>{
    let wrapper;
    let consoleLogSpy;
    global.fetch = jest.fn(()=>Promise.resolve({
        json: () => Promise.resolve({
            "answer":"yes",
            "forced":false,
            "image":"https://yesno.wtf/assets/yes/1-af11222d8d4af90bdab8fc447c8cfebf.gif"})
    }));
    beforeEach(()=>{
        wrapper = shallowMount(Indecision);
        consoleLogSpy = jest.spyOn(console,'log');
    });
    test('Debe hacer match con el Snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot();
    });
    test('escribir en el input no debe disparar nada',async ()=>{
        const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer');
        const input = wrapper.find('input');
        await input.setValue('Hola Mundo');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).toHaveReturnedTimes(0);
    });
    test('? dispara getAnswer',async ()=>{
        const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer');
        const input = wrapper.find('input');
        await input.setValue('Hola?');
        expect(getAnswerSpy).toHaveBeenCalled();
    });
    test('pruebas getAnswer',async()=>{
        await wrapper.vm.getAnswer();
        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.answer).toBe('Si')
    });
    test('fallo API',async()=>{
        fetch.mockImplementationOnce(() => Promise.reject('Api is down'));
        await wrapper.vm.getAnswer();
        const img = wrapper.find('img');
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('La imagen es null');
    });
});