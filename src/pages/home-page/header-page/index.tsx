import { Button, Col, Dropdown, Input, Menu, Row, Space } from 'antd';
import React from 'react';
import { HeaderList } from './const';
import styles from './index.module.less';

const HeaderPage: React.FC = () => {
	const VipMenuList = (
		<Menu>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					开通绿钻贵族
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					开通付费包
				</a>
			</Menu.Item>
		</Menu>
	);
	const RechargeMenuList = (
		<Menu>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					开通绿钻贵族
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com"
				>
					开通付费包
				</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className={styles.headerPageWrap}>
			<Row className={styles.headerList} align="middle" justify="center">
				<Col span={6}>
					<img src="https://y.qq.com/mediastyle/yqq/img/logo.png" />
				</Col>
				<Col span={10}>
					<ul>
						{HeaderList?.map((item) => (
							<li key={item.key}>{item.name}</li>
						))}
					</ul>
				</Col>
				<Col span={8}>
					<Space>
						<Input.Search placeholder="搜索音乐、MV、歌单、用户" />
						<Button type="text">登录</Button>
						<Dropdown overlay={VipMenuList} placement="bottomCenter" arrow>
							<Button>购买乐币</Button>
						</Dropdown>
						<Dropdown overlay={RechargeMenuList} placement="bottomCenter" arrow>
							<Button>充值饭票</Button>
						</Dropdown>
					</Space>
				</Col>
			</Row>
		</div>
	);
};

export default HeaderPage;
