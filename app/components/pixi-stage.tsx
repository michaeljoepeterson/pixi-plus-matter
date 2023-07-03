'use client'

import { Application, Graphics } from "pixi.js";
import { useEffect, useMemo, useRef } from "react";

export const PixiStage = () => {
    const ball = useRef<Graphics>();
    const paddle = useRef<Graphics>();

    const app = useMemo(() => {
        return new Application({
            width: 600,
            height: 600
        });
    }, []);
    console.log(app);
    useEffect(() => {
        if(app){
            const graphics = new Graphics();
            graphics.beginFill("red");
            graphics.drawCircle(0 ,0, 10);
            graphics.position.set(10, 30);
            graphics.endFill();
            app.stage.addChild(graphics);
            ball.current = graphics;

            const paddleGraphics = new Graphics();
            paddleGraphics.beginFill("green");
            paddleGraphics.drawRect(0 ,0, 10, 200);
            paddleGraphics.position.set(50, 10);
            paddleGraphics.endFill();
            app.stage.addChild(paddleGraphics);
            paddle.current = paddleGraphics;

            document.body.append((app.view) as any);
        }
    }, [app]);

    return (
        <>
        </>
    );
}

export default PixiStage;