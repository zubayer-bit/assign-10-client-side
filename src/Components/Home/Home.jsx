import React from 'react';
import TreePlantationBanner from '../TreePlantationBanner/TreePlantationBanner';
import FeatureSection from './FeatureSection/FeatureSection';
import { useLoaderData } from 'react-router';
import GallerySection from './GallerySection/GallerySection';
import Newsletter from './Newsletter';

const Home = () => {
    const {featureData,imageTreePlant} = useLoaderData();
    return (
        <div>
            <TreePlantationBanner></TreePlantationBanner>
            <FeatureSection featureData={featureData}></FeatureSection>
            <GallerySection imageTreePlant={imageTreePlant}></GallerySection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;