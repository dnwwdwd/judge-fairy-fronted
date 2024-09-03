"use client";
import {GithubOutlined, LogoutOutlined, PlusCircleFilled, SearchOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input,} from 'antd';
import React, {useState} from 'react';
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                prefix={
                    <SearchOutlined/>
                }
                placeholder="搜索题目"
                variant="borderless"
            />
            <PlusCircleFilled
                style={{
                    fontSize: 24,
                }}
            />
        </div>
    );
};

interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({children}: Props) {
    const [pathname] = usePathname();
    return (
        <div
            id="basicLayout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProLayout
                title="面试狗"
                layout="top"
                logo={
                    <Image src="/assets/logo.png" height={32} width={32} alt="面试狗"/>
                }
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: 'C1own',
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined/>,
                                            label: '退出登录',
                                        },
                                    ],
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput key="search"/>,
                        <a href="https://www.github.com/dnwwdwd" target="_blank" key="github">
                            <GithubOutlined key="githubField"/>
                        </a>
                    ];
                }}
                headerTitleRender={(logo, title, _) => {
                    const defaultDom = (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                    if (typeof window === 'undefined') return defaultDom;
                    if (document.body.clientWidth < 1400) {
                        return defaultDom;
                    }
                    if (_.isMobile) return defaultDom;
                    return (
                        <>
                            {defaultDom}
                        </>
                    );
                }}
                menuFooterRender={(props) => {
                    if (props?.collapsed) return undefined;
                    return (
                        <div
                            style={{
                                textAlign: 'center',
                                paddingBlockStart: 12,
                            }}
                        >
                            <div>© 2021 Made with love</div>
                            <div>by Ant Design</div>
                        </div>
                    );
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuDataRender={() => {
                    return [
                        {
                            path: "/questions",
                            name: "题目"
                        },
                        {
                            path: "/banks",
                            name: "题库"
                        },
                    ]
                }}
                menuItemRender={(item, dom) => (
                    <Link
                        href={item.path || "/"}>
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
};