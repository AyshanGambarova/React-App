import {useState} from "react";
import {Checkbox, Input, Radio, Select} from 'antd';

function Index() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [agree, setAgree] = useState(false)
    const [radio, setRadio] = useState(1)
    const [radioGroupOptions, setRadioGroupOptions] = useState([{
        value: 1,
        label: 'Male'
    }, {
        value: 2,
        label: 'Female'
    }
    ])
    const [selectedOption, setSelectedOption] = useState(['jack']);
    const [options, setOptions] = useState([
        {
            value: 'jack',
            key: 'Jack',
        },
        {
            value: 'lucy',
            key: 'Lucy',
        },
        {
            value: 'yiminghe',
            key: 'Yiminghe',
        },
    ]);

    const {TextArea} = Input;

    return (
        <>
            <div>Input</div>
            <Input type="text" value={name} onChange={e => setName(e.target.value)}/>
            {name}
            <br/>
            <br/>
            <div>Text area</div>
            <TextArea value={description} rows={4} maxLength={6}
                      onChange={e => setDescription(e.target.value)}/>
            {description}
            <br/>
            <br/>
            <div>Select</div>
            <Select
                mode="multiple"
                value={selectedOption}
                onChange={selectedValues => setSelectedOption(selectedValues)}
                style={{width: '50%'}}
            >
                {options.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.key}
                    </Select.Option>
                ))}
            </Select>
            <br/>
            <br/>
            <div>Checkbox</div>
            <Checkbox checked={agree} onChange={e => setAgree(e.target.checked)}> {agree.toString()}</Checkbox>
            <br/>
            <br/>
            <div>Radio group</div>
            <Radio.Group value={radio} onChange={e => setRadio(e.target.value)}>
                {radioGroupOptions.map(option => (
                    <Radio.Button key={option.value} value={option.value}>
                        {option.label}
                    </Radio.Button>
                ))}
            </Radio.Group>
            {radio}
        </>
    )
}

export default Index;