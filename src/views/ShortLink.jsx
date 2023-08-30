import { CONFIG_ENV } from '../config/env.js'
import { useSelector } from 'react-redux'
import { selectAccoutInfo } from '../store/globalState'
import { Input, Button } from 'antd'
import { debounce } from "lodash-es";
import '../styles/shortLink.scss'

export default function ShortLink() {
    const accountInfo = useSelector(selectAccoutInfo)
    // 原先是计算属性，react 中不需要特殊声明，异步获取的也会更新
    const apiUrl = `${CONFIG_ENV.BASE_URL}/share/shortLink/list?_id=${accountInfo._id
        }&pageSize=100`;
    ;

    let queryText = ""
    const queryChange = (e) => {
        console.log("queryChange", e.target.value);
        queryText = e.target.value
        console.log(queryText)
        // resetPage();
        // getList();
    };
    const queryChangeDebounce = debounce(queryChange, 300);

    function addShortLink() {

    }

    return (
        <div className="short-link">
            <div className="tips">
                配置成功后，可以通过 GET 请求
                {apiUrl} 接口获取配置数据。具体应用参考：
                <a href="https://github.com/dev-zuo/s.zuo11.com" target="_blank" rel="noreferrer">
                    s.zuo11.com 短链接服务
                </a>
            </div>
            <div className="sl-top">
                <div>
                    <span>路径查询：</span>
                    <Input showCount maxLength={20} placeholder="请输入查询关键字" onChange={queryChangeDebounce} />
                </div>
                <div>
                    <Button type="primary" onClick={addShortLink}>新增短链接</Button>
                </div>
            </div>
        </div>
    )
}