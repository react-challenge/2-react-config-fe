import { CONFIG_ENV } from '../config/env.js'
import { useSelector } from 'react-redux'
import { selectAccoutInfo } from '../store/globalState'
import { Input, Button, Table, Space, message, Pagination } from 'antd'
import { debounce } from "lodash-es";
import '../styles/shortLink.scss'
import { useEffect, useState } from 'react';
import axiosApi from '../utils/axios.js'
import ShortLinkAdd from './ShortLinkAdd.jsx';

export default function ShortLink() {
    const accountInfo = useSelector(selectAccoutInfo)
    // 原先是计算属性，react 中不需要特殊声明，异步获取的也会更新
    const apiUrl = `${CONFIG_ENV.BASE_URL}/share/shortLink/list?_id=${accountInfo._id
        }&pageSize=100`;
    ;

    let queryText = ""
    const queryChange = (e) => {
        console.log("queryChange", e.target.value);
        queryText = e.target.value.trim()
        console.log(queryText)
        resetPage();
        getList(1, 20);
    };
    const queryChangeDebounce = debounce(queryChange, 300);

    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false)
    const [editData, setEditData] = useState({})
    function addShortLink() {
        setEditData({})
        setIsOpenEditDialog(true)
    }
    function editShortLink(record) {
        console.log('editShortLink', record)
        setEditData(record)
        setIsOpenEditDialog(true)
    }

    const columns = [
        { title: '短连接路径', dataIndex: 'shortLink', key: 'shortLink' },
        { title: '重定向 URL', dataIndex: 'redirect', key: 'redirect' },
        { title: '创建时间', dataIndex: 'createDate', key: 'createDate' },
        {
            title: '操作', key: 'opt', render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => editShortLink(record)}>修改</Button>
                    <Button type="link" onClick={() => deleteShortLink(record)}>删除</Button>
                </Space>
            ),
        }
    ]
    const [tableData, setTableData] = useState({
        list: [],
        total: 0
    })
    const [loading, setLoading] = useState(false);
    let [currentPage, setCurrentPage] = useState(1)
    let [pageSize, setPageSize] = useState(20)
    const getList = async (number, size) => {
        try {
            setLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep, test loading
            const res = await axiosApi.get("/shortLink/list", {
                params: {
                    queryText,
                    currentPage: number || currentPage,
                    pageSize: size || pageSize,
                },
            });
            console.log(res);
            const tableDataList = (res.data?.list || []).map((item) => {
                item.key = item.shortLink
                return item; // 处理数据
            });
            setTableData({
                total: res.data?.total || 0,
                // total: 100, // 分页测试
                list: tableDataList
            })
            window.scrollTo(0, 0); // 分页后，滚动到顶部
        } catch (e) {
            console.error(e);
            message.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, [])

    function deleteShortLink(record) {
        console.log('deleteShortLink', record)
    }

    function onPaginationChange(number, size) {
        console.log(number, size) // 加个判断，如果 size 变更，当前页切到 1
        setCurrentPage(pageSize !== size ? 1 : number)
        setPageSize(size)
        getList(pageSize !== size ? 1 : number, size)
    }
    function resetPage() {
        setCurrentPage(1)
        setPageSize(20)
    }

    return (
        <div className="short-link-page">
            <div className="tips">
                配置成功后，可以通过 GET 请求
                {apiUrl} 接口获取配置数据。具体应用参考：
                <a href="https://github.com/dev-zuo/s.zuo11.com" target="_blank" rel="noreferrer">
                    s.zuo11.com 短链接服务
                </a>
            </div>

            <div className="sl-top">
                <div className="sl-top-left">
                    <span className="stl-label">路径查询：</span>
                    <Input placeholder="请输入查询关键字" onChange={queryChangeDebounce} allowClear />
                </div>
                <div>
                    <Button type="primary" onClick={addShortLink}>新增短链接</Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={tableData.list}
                bordered
                size="middle"
                loading={loading}
                pagination={false}
            />
            <div className="pagination-wrap">
                <Pagination
                    total={tableData.total}
                    current={currentPage}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={() => `共 ${tableData.total} 条`}
                    onChange={onPaginationChange}
                />
            </div>

            {isOpenEditDialog &&
                <ShortLinkAdd
                    isOpenEditDialog={isOpenEditDialog}
                    setIsOpenEditDialog={setIsOpenEditDialog}
                    editData={editData}
                    handleOk={(isEdit) => isEdit ? getList() : getList(1, 20)}
                />}
        </div>
    )
}