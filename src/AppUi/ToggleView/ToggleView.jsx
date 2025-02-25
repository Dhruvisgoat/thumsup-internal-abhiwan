import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { ViewContext } from '../../RefContext/ViewContext';

const ToggleView = () => {
    const { viewMode, toggleViewMode, setIsIsometric, isIsometric } = useContext(ViewContext);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '0%',
                right: '0%',
                zIndex: '5',
                borderRadius: '6px',                    // Slightly larger border radius
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                transform: 'scale(1)',                // Increased scale from 0.5 to 0.75
                transformOrigin: 'bottom right'          // Anchor scaling to bottom right
            }}
        >
            <ButtonGroup>
                {/* <Button
                    variant={"outline-danger"}
                    onClick={() => setIsIsometric((prev) => !prev)}
                    style={{ fontSize: '0.875rem', padding: '6px 12px' }} // Increased font size and padding
                >
                    {isIsometric ? 'Pers' : 'Iso'}
                </Button> */}
                {/* 
                <Button
                    variant={viewMode === "3rd" ? "primary" : "outline-primary"}
                    onClick={() => toggleViewMode("3rd")}
                    style={{ fontSize: '0.875rem', padding: '6px 12px' }} // Increased font size and padding
                >
                    3rd
                </Button> */}
                <Button
                    variant={viewMode === "top" ? "primary" : "outline-primary"}
                    onClick={() => toggleViewMode("top")}
                    style={{ fontSize: '0.875rem', padding: '6px 12px' }} // Increased font size and padding
                >
                    Top
                </Button>
                <Button
                    variant={viewMode === "side" ? "primary" : "outline-primary"}
                    onClick={() => {
                        setIsIsometric(true);
                        toggleViewMode("side");
                    }}
                    style={{ fontSize: '0.875rem', padding: '6px 12px' }} // Increased font size and padding
                >
                    Side
                </Button>

                <Button
                    variant={viewMode === "front" ? "primary" : "outline-primary"}
                    onClick={() => {
                        setIsIsometric(false);
                        toggleViewMode("front");
                    }}
                    style={{ fontSize: '0.875rem', padding: '6px 12px' }} // Increased font size and padding
                >
                    front
                </Button>

            </ButtonGroup>
        </div>
    );
};

export default ToggleView;
