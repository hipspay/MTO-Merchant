import React from 'react';

import BarChart from '../../components/Home/BarChart';
import LineChart from '../../components/Home/LineChart';
import Layout from '../../components/Layout';

import './style.scss';

function Home() {
    return (
        <Layout title="Home">
            <div className="home-page">
                <BarChart />
                <LineChart />
            </div>
        </Layout>
    );
}

export default Home;
