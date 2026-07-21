const http = require('http');
const mineflayer = require('mineflayer');

// Render'ın kapanmasını önleyen mini web sunucusu
http.createServer((req, res) => {
  res.write("AFK Botu 7/24 Aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'oyna.wrus.net',
  port: 25565,
  username: 'TxcPsych11',
  version: false // Sürümü sunucudan otomatik algılasın!
};

function createBot() {
  console.log('Sunucuya bağlanılmaya çalışılıyor...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla girdi!');

    // 1. ADIM: 3. saniyede ilk şifre
    setTimeout(() => {
      bot.chat('1122334455harun');
      console.log('1. Şifre gönderildi.');
    }, 3000);

    // 2. ADIM: 6. saniyede şifre onayı
    setTimeout(() => {
      bot.chat('1122334455harun');
      console.log('2. Şifre (Onay) gönderildi.');
    }, 6000);

    // 3. ADIM: 9. saniyede Gmail adresi
    setTimeout(() => {
      bot.chat('harun123455789pp@gmail.com');
      console.log('Gmail adresi gönderildi.');
    }, 9000);

    // 4. ADIM: 12. saniyede 5. slottaki pusulayı kullanma
    setTimeout(async () => {
      try {
        const item = bot.inventory.slots[4];
        if (item) {
          await bot.equip(item, 'hand');
          bot.activateItem();
          console.log('5. slottaki pusula kullanıldı!');
        } else {
          console.log('5. slotta pusula bulunamadı.');
        }
      } catch (err) {
        console.log('Pusula hatası:', err.message);
      }
    }, 12000);

    // 5. ADIM: 15. saniyede Survival seçme
    setTimeout(() => {
      try {
        if (bot.currentWindow) {
          bot.clickWindow(20, 0, 0);
          console.log('21. slottaki Survival seçildi!');
        } else {
          console.log('Menü açık değil.');
        }
      } catch (err) {
        console.log('Menü hatası:', err.message);
      }
    }, 15000);

    // 6. ADIM: 19. saniyede AFK bölgesine geçiş
    setTimeout(() => {
      bot.chat('/warp afk');
      console.log('/warp afk gönderildi!');
    }, 19000);
  });

  // Zıplama
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Hata detayını görme
  bot.on('error', err => console.log('Bağlantı Hatası Detayı:', err.message || err));

  bot.on('end', reason => {
    console.log('Bağlantı koptu (Sebep: ' + reason + '), 10s sonra tekrar deneniyor...');
    setTimeout(createBot, 10000);
  });
}

createBot();
