import {useState} from "react";
import {Button, Checkbox, Image, Input, List, message, Radio, Select, Upload} from 'antd';
import {FileImageOutlined, UploadOutlined} from '@ant-design/icons';

function Index() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [agree, setAgree] = useState(false)
    const [radio, setRadio] = useState(1)
    const [selectedOption, setSelectedOption] = useState(['jack']);
    const [fileList, setFileList] = useState([]);
    const [radioGroupOptions, setRadioGroupOptions] = useState([{
        value: 1,
        label: 'Male'
    }, {
        value: 2,
        label: 'Female'
    }
    ])
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
    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setFileList([...info.fileList])
                console.log('mine', fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

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
            <br/>
            <br/>
            <div>Upload</div>
            <Upload  {...props} >
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
            <List
                style={{marginTop: 20}}
                bordered
                dataSource={fileList}
                renderItem={item => (
                    <List.Item>
                        {item.type.startsWith('image/') ? (
                            <Image src={item.url} width={100}/>
                        ) : (
                            <FileImageOutlined style={{fontSize: 48}}/>
                        )}
                        <List.Item.Meta
                            title={item.name}
                            description={`${(item.size / 1024).toFixed(2)} KB`}
                        />
                    </List.Item>
                )}
            />
            <Button disabled={!description} type="primary">Primary Button</Button>
        </>
    )
}

export default Index;