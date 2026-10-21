// Patch app-builder-lib getOrCreatePublisher to cache the publisher promise
// synchronously; upstream master fix for the duplicate GitHub draft race
// (electron-userland/electron-builder#10026, #6676).
/* eslint-disable @typescript-eslint/no-require-imports -- CJS node script */
const fs = require('fs')
const path = require('path')

const file = path.join(
  __dirname,
  '..',
  'node_modules',
  'app-builder-lib',
  'out',
  'publish',
  'PublishManager.js'
)

const stale = `        let publisher = this.nameToPublisher.get(providerCacheKey);
        if (publisher == null) {
            publisher = await createPublisher(this, appInfo.version, publishConfig, this.publishOptions, this.packager);
            this.nameToPublisher.set(providerCacheKey, publisher);
            builder_util_1.log.info({ publisher: publisher.toString() }, "publishing");
        }`

const patched = `        let publisher = this.nameToPublisher.get(providerCacheKey);
        if (publisher == null) {
            publisher = createPublisher(this, appInfo.version, publishConfig, this.publishOptions, this.packager).then(it => {
                if (it != null) {
                    builder_util_1.log.info({ publisher: it.toString() }, "publishing");
                }
                return it;
            });
            this.nameToPublisher.set(providerCacheKey, publisher);
            publisher.catch(() => this.nameToPublisher.delete(providerCacheKey));
        }`

const source = fs.readFileSync(file, 'utf8')

if (source.includes(patched)) {
  console.log('publisher-race patch: already applied')
} else if (source.includes(stale)) {
  fs.writeFileSync(file, source.replace(stale, patched))
  console.log('publisher-race patch: applied')
} else {
  console.error(
    'publisher-race patch: PublishManager.js does not match the expected source; app-builder-lib changed upstream, re-check scripts/patch-ebl-publisher-race.js'
  )
  process.exit(1)
}
