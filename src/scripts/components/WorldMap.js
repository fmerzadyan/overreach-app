import React from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Marker
} from 'react-simple-maps';
import Markers from 'react-simple-maps/lib/Markers';
import { scaleLinear } from 'd3-scale';
import geoJsonObject from '../../assets/maps/world-50m-simplified.json';

export default class WorldMap extends React.Component {
    state = {
        zoom: 2,
        defaultCentre: [6.15, 47.3],
        currentCentre: [], // TODO
        markers: [] // TODO
    };
    handleZoomIn = () => {
        this.setState(() => ({
            zoom: this.state.zoom * 2
        }));
    };
    handleZoomOut = () => {
        this.setState(() => ({
            zoom: this.state.zoom / 2
        }));
    };
    handleMarkerClick = (marker, e) => {
        console.log(marker);
    };
    handleMoveStart = (currentCentre = this.state.defaultCentre) => {
        console.log(currentCentre); // TODO
    };
    handleMoveEnd = (newCentre) => {
        console.log(newCentre); // TODO
    };
    render() {
        const colorScale = scaleLinear()
            .domain([0, 100000000, 1338612970]) // Max is based on China
            .range(['#FFF176', '#FFC107', '#E65100']);
        return (
            <div>
                <button onClick={this.handleZoomIn}>{'Zoom in'}</button>
                <button onClick={this.handleZoomOut}>{'Zoom out'}</button>
                <hr />
                <ComposableMap style={{ width: '100%' }}>
                    <ZoomableGroup
                        zoom={this.state.zoom}
                        center={this.state.defaultCentre}
                        onMoveStart={this.handleMoveStart}
                        onMoveEnd={this.handleMoveEnd}
                    >
                        <Geographies geography={geoJsonObject} disableOptimization>
                            {(geographies, projection) => geographies.map((geography, i) => (
                                <Geography
                                    key={`geography-${i}`}
                                    cacheId={`geography-${i}`}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: colorScale(geography.properties.pop_est),
                                            stroke: '#FFF',
                                            strokeWidth: 0.5,
                                            outline: 'none',
                                        },
                                    }}
                                />
                            ))}
                        </Geographies>
                        <Markers>
                            <Marker
                                marker={{ coordinates: [8.5, 47.3] }}
                                style={{
                                    default: { fill: 'yellow' },
                                    hover: { fill: 'orange' },
                                    pressed: { fill: 'red' }
                                }}
                                onClick={this.handleMarkerClick}
                            >
                                <circle cx={0} cy={0} r={5} />
                            </Marker>
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}
