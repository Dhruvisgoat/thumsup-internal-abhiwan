import * as THREE from "three";
import { Vector3 } from 'three';

function getRandomPointOnGeometry(mesh) {
    const geometry = mesh.geometry;
    geometry.computeBoundsTree?.(); // Ensure BVH compatibility if available

    const positionAttribute = geometry.attributes.position;
    const indexAttribute = geometry.index;
    const triangleCount = indexAttribute.count / 3;

    const areas = [];
    let totalArea = 0;

    // Compute triangle areas
    const a = new Vector3(), b = new Vector3(), c = new Vector3();
    for (let i = 0; i < triangleCount; i++) {
        const i0 = indexAttribute.getX(i * 3);
        const i1 = indexAttribute.getX(i * 3 + 1);
        const i2 = indexAttribute.getX(i * 3 + 2);

        a.fromBufferAttribute(positionAttribute, i0);
        b.fromBufferAttribute(positionAttribute, i1);
        c.fromBufferAttribute(positionAttribute, i2);

        const edge1 = new Vector3().subVectors(b, a);
        const edge2 = new Vector3().subVectors(c, a);
        const crossProduct = new Vector3().crossVectors(edge1, edge2);

        const area = crossProduct.length() / 2;
        totalArea += area;
        areas.push(totalArea); // Cumulative sum
    }

    // Randomly select a triangle
    const randomArea = Math.random() * totalArea;
    const triangleIndex = areas.findIndex(area => randomArea <= area);

    // Sample a random point in the chosen triangle
    const i0 = indexAttribute.getX(triangleIndex * 3);
    const i1 = indexAttribute.getX(triangleIndex * 3 + 1);
    const i2 = indexAttribute.getX(triangleIndex * 3 + 2);

    a.fromBufferAttribute(positionAttribute, i0);
    b.fromBufferAttribute(positionAttribute, i1);
    c.fromBufferAttribute(positionAttribute, i2);

    const r1 = Math.sqrt(Math.random());
    const r2 = Math.random();

    const point = new Vector3()
        .addScaledVector(a, 1 - r1)
        .addScaledVector(b, r1 * (1 - r2))
        .addScaledVector(c, r1 * r2);

    return point;
}


export { getRandomPointOnGeometry };
