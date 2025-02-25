
import React  from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier"

export function Scene(props) {
  const { nodes, materials } = useGLTF('/models/Garden-transformed.glb')
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh" rotation={[0,-Math.PI/4,0]}>
        <group {...props} dispose={null} position={[0,0,0]}>
          <mesh geometry={nodes.base_TEXTURE_FINALE_0.geometry} material={materials.TEXTURE_FINALE} position={[-8.96, 4.56, 14.054]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.201, 1.203, 1.203]} />
          <mesh geometry={nodes.finestre_laterali002_LEGNO_0.geometry} material={materials.PaletteMaterial001} position={[-9.018, 6.979, 17.342]} rotation={[-Math.PI / 2, 0, -3.141]} />
          <mesh geometry={nodes.Cube_BIANCO_0.geometry} material={materials.PaletteMaterial002} position={[-9.947, 8.937, 11.446]} rotation={[-Math.PI / 2, 0, 0]} scale={1.203} /> */
          <mesh geometry={nodes.Cube002__0.geometry} material={materials.PaletteMaterial003} position={[-7.137, 8.573, 14.094]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.601, 1.256, 1.203]} />
          <mesh geometry={nodes.casa002_VETRI_FINALE001_0.geometry} material={materials.PaletteMaterial004} position={[-8.985, 5.378, 14.054]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.CANCELLO_GROSSO_lowpolytex001_0.geometry} material={materials['lowpolytex.001']} position={[6.337, 5.279, 2.828]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          <mesh geometry={nodes.CANCELLO_GROSSO_ENTRATA_CARTELLO001_0.geometry} material={materials['CARTELLO.001']} position={[17.588, 7.207, 17.752]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
          <mesh geometry={nodes.TERRENO_BASI_EDIFICI_0.geometry} material={materials.BASI_EDIFICI} position={[-8.637, 5.299, 13.994]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.casa_base_palette_0.geometry} material={materials.palette} position={[-9.569, 5.332, -6.268]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          <mesh geometry={nodes.insegna_texture_0.geometry} material={materials.texture} position={[-9.559, 11.319, -7.331]} rotation={[Math.PI, 0, Math.PI / 2]} />
          <mesh geometry={nodes.piante_vasi_0.geometry} material={materials.PaletteMaterial005} position={[-12.989, 5.666, -9.917]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          <mesh geometry={nodes.bancone_texture_cocktail_0.geometry} material={materials.cocktail} position={[24.85, 12.274, -37.145]} rotation={[-Math.PI / 2, 0, 0]} scale={1.79} />
          <mesh geometry={nodes.poster_poster_0.geometry} material={materials.poster} position={[23.767, 12.827, -32.296]} rotation={[0, -Math.PI / 2, 0]} scale={1.79} />
          <mesh geometry={nodes.Cube024_postermuro_0.geometry} material={materials.postermuro} position={[13.565, 5.327, -34.784]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.Cube033_benzinaio_0.geometry} material={materials.benzinaio} position={[-1.198, 7.713, -31.142]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          <mesh geometry={nodes.freccia_insegna_0.geometry} material={materials.insegna} position={[-2.521, 7.317, -22.373]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.terriccio001_terriccio_0.geometry} material={materials.terriccio} position={[17.765, 5.519, 2.839]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.Plane006_parcheggio_gelati_0.geometry} material={materials.parcheggio_gelati} position={[48.607, 5.299, -3.629]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.Plane002_strada2_0.geometry} material={materials.strada2} position={[31.271, 5.296, -13.823]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.stop_texture003_0.geometry} material={materials['texture.003']} position={[38.828, 6.899, 8.765]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
          <mesh geometry={nodes.lato_camion_insegna001_0.geometry} material={materials['insegna.001']} position={[47.468, 6.92, -8.179]} rotation={[-Math.PI / 2, 0, 0.745]} />
          <mesh geometry={nodes.parcheggio_SEGNALE_PARCHEGGIO_0.geometry} material={materials.SEGNALE_PARCHEGGIO} position={[39.045, 7.332, 5.276]} rotation={[-Math.PI / 2, 0, -0.649]} scale={[-1, 1, 1]} />
        </group>

      </RigidBody>

      <group {...props} rotation={[0,-Math.PI/4,0]}>
        <instancedMesh args={[nodes.vaso_rettangolare_dx_1_VASI001_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.vaso_rettangolare_dx_1_VASI001_0.instanceMatrix} />
        <instancedMesh args={[nodes.vaso_rettangolare_dx_1_TERRA001_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.vaso_rettangolare_dx_1_TERRA001_0.instanceMatrix} />
        <instancedMesh args={[nodes.Cube018_Material004_0.geometry, materials.TEXTURE_FINALE, 5]} instanceMatrix={nodes.Cube018_Material004_0.instanceMatrix} />
        <instancedMesh args={[nodes.sgabello_texture001_0.geometry, materials.TEXTURE_FINALE, 6]} instanceMatrix={nodes.sgabello_texture001_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere052_CESPUGLI_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.Icosphere052_CESPUGLI_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere053_CESPUGLI_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.Icosphere053_CESPUGLI_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere056_CESPUGLI_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.Icosphere056_CESPUGLI_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere057_CESPUGLI_0.geometry, materials.PaletteMaterial002, 6]} instanceMatrix={nodes.Icosphere057_CESPUGLI_0.instanceMatrix} />
        <instancedMesh args={[nodes.vaso_rettangolare_dx_1004_VASI_0.geometry, materials.PaletteMaterial002, 16]} instanceMatrix={nodes.vaso_rettangolare_dx_1004_VASI_0.instanceMatrix} />
        <instancedMesh args={[nodes.vaso_rettangolare_dx_1004_TERRA_0.geometry, materials.PaletteMaterial002, 16]} instanceMatrix={nodes.vaso_rettangolare_dx_1004_TERRA_0.instanceMatrix} />
        <instancedMesh args={[nodes.tubo_benzina005_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.tubo_benzina005_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.maniglia_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.maniglia_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.beccuccio_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.beccuccio_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.tubo_benzina001_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.tubo_benzina001_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.maniglia001_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.maniglia001_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.beccuccio001_texture002_0.geometry, materials.TEXTURE_FINALE, 16]} instanceMatrix={nodes.beccuccio001_texture002_0.instanceMatrix} />
        <instancedMesh args={[nodes.Cylinder003_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 7]} instanceMatrix={nodes.Cylinder003_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.LAMPIONE005_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 29]} instanceMatrix={nodes.LAMPIONE005_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Cube005_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 7]} instanceMatrix={nodes.Cube005_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Cylinder028_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 5]} instanceMatrix={nodes.Cylinder028_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere076_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 5]} instanceMatrix={nodes.Icosphere076_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Cylinder053_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 10]} instanceMatrix={nodes.Cylinder053_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere108_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 5]} instanceMatrix={nodes.Icosphere108_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.Icosphere069_lowpolytex_0.geometry, materials.TEXTURE_FINALE, 5]} instanceMatrix={nodes.Icosphere069_lowpolytex_0.instanceMatrix} />
        <instancedMesh args={[nodes.ruote002_texture004_0.geometry, materials.TEXTURE_FINALE, 6]} instanceMatrix={nodes.ruote002_texture004_0.instanceMatrix} />
      </group>



    </>
  )
}

useGLTF.preload('/models/Garden-transformed.glb')

