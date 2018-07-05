import {expect} from 'chai';
import m from 'mocha';

import RPSGoogleMap from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Google Map', () => {

  m.it('should emit error if no config found', async function () {
    let ctx = new RpsContext
    
    ctx.event.on('action.module.load.error',(...params)=>{
      let modName = params[0], msg = params[1].message;

      expect(msg).to.be.equals('No config found for Google Map module');
      expect(modName).to.be.equals('google-maps');
    })

    let md = new RPSGoogleMap(ctx);
  }).timeout(0);

  m.xit('should get geocode', async function () {
    let ctx = new RpsContext
    ctx.addModuleContext('google-maps',{apiKey:'API_KEY'});

    let gm = new RPSGoogleMap(ctx);
    let output = await gm.geocode(ctx,{},"Bukit Batok West Ave 4");

    console.log(output);

  }).timeout(0);

})
