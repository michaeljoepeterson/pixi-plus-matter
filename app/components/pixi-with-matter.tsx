'use client'

import { Bodies, Engine, Body, Composite } from "matter-js";
import { Application, Graphics } from "pixi.js";
import { useCallback, useEffect, useMemo, useRef } from "react";

export const PixiWithMatter = ({
    target
}: {
    target: any
}) => {
    const ball = useRef<Graphics>();
    const paddle = useRef<Graphics>();
    const ballBody = useRef<Body>();
    const paddleBody = useRef<Body>();

    const tickerRef = useRef<any>();
    const ballX = 10;
    const ballY = 30;
    const ballRadius = 10;
    const paddleX = 100;
    const paddleY = 100;
    const paddleHeight = 200;
    const paddleWidth = 10;

    const engine = useMemo(() => {
        try{
            const engine = Engine.create({
                gravity: {
                    x: 1,
                    y: 1,
                    scale: 0.5
                },
            });
            return engine;
        }
        catch(e){
            console.error(e);
            return null;
        }
    }, []);

    const app = useMemo(() => {
        return new Application({
            width: 600,
            height: 600
        });
    }, []);
    console.log(app);

    
    const updateEngine = useCallback(() => {
        if(!app || !engine){
            return;
        }
        const fps = app.ticker.FPS / 1000;
        Engine.update(engine, fps);
    }, [engine, app]);

    useEffect(() => {
        if(app && engine && target){
            const graphics = new Graphics();
            graphics.beginFill("red");
            graphics.drawCircle(0 ,0, 10);
            graphics.position.set(ballX, ballY);
            graphics.endFill();
            app.stage.addChild(graphics);
            ball.current = graphics;
            const circleBody = Bodies.circle(ballX, ballY, ballRadius, {
                isStatic: false,
            });
            ballBody.current = circleBody;
            Composite.add(engine.world, circleBody);
            
            const paddleGraphics = new Graphics();
            paddleGraphics.beginFill("green");
            paddleGraphics.drawRect(paddleX, paddleY, paddleWidth, paddleHeight);
            paddleGraphics.position.set(paddleX, paddleY);
            paddleGraphics.endFill();
            app.stage.addChild(paddleGraphics);
            paddle.current = paddleGraphics;
            const rectBody = Bodies.rectangle(paddleX + paddleWidth / 2, paddleY + paddleHeight / 2, paddleWidth, paddleHeight, {
                isStatic: false,
            });
            paddleBody.current = rectBody;
            Composite.add(engine.world, rectBody);

            target.append((app.view) as any);
        }
    }, [app, engine, target]);

    const handleTick = useCallback(() => {
        const bX = ballBody.current?.position.x;
        const bY = ballBody.current?.position.y;
        const pX = paddleBody.current?.position.x;
        const pY = paddleBody.current?.position.y;
        // @ts-ignore
        paddleBody.current.force = {
            x: -1,
            y: -3,
        }

        ball.current?.position.set(bX, bY);
        paddle.current?.position.set(pX, pY);

        updateEngine();
    }, [app, engine]);

    useEffect(() => {
        if(!app || !engine){
            return;
        }

        if(app && engine && !tickerRef.current){
            console.log('add ticker');
            tickerRef.current = app.ticker.add(handleTick);

        }
        return () => {
            if(app && tickerRef.current){
                console.log('remove ticker')
                app.ticker.remove(handleTick);
                tickerRef.current = null;
            }
        }
    }, [app, engine]);

    return (
        <>
        </>
    );
}

export default PixiWithMatter;