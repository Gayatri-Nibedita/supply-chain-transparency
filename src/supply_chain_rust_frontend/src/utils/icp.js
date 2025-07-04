import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as supply_chain_idl, canisterId as supply_chain_id } from '../../../declarations/supply_chain_rust_backend';

const agent = new HttpAgent();
export const supplyChainActor = Actor.createActor(supply_chain_idl, {
  agent,
  canisterId: supply_chain_id,
});
