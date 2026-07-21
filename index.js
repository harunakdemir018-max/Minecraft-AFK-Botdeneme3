const http = require('http');
const mineflayer = require('mineflayer');

// Render'ın kapanmasını önleyen mini sunucu
http.createServer((req, res) => {
  res.write("AFK Botu 7/24 Aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'oyna.wrus.net',
  port: 25565,
  username: 'TxcPsych11',
  version: '1.20.1'
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla bağlandı!');

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
        const item = bot.inventory.slots[4]; // 5. slot (Index 4)
        if (item) {
          await bot.equip(item, 'hand');
          bot.activateItem();
          console.log('5. slottaki pusula kullanıldı!');
        } else {
          console.log('5. slotta pusula bulunamadı.');
        }
      } catch (err) {
        console.log('Pusula kullanılırken hata:', err);
      }
    }, 12000);

    // 5. ADIM: 15. saniyede menüden 21. slota tıklama (Survival)
    setTimeout(() => {
      try {
        if (bot.currentWindow) {
          bot.clickWindow(20, 0, 0); // 21. slot (Index 20)
          console.log('21. slottaki Survival seçildi!');
        } else {
          console.log('Menü açık olmadığı için tıklanamadı.');
        }
      } catch (err) {
        console.log('Menü tıklama hatası:', err);
      }
    }, 15000);

    // 6. ADIM: 19. saniyede AFK bölgesine geçiş
    setTimeout(() => {
      bot.chat('/warp afk');
      console.log('/warp afk gönderildi!');
    }, 19000);

  });

  // Oyundan atılmamak için 60 saniyede bir zıplama
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Bağlantı koparsa otomatik tekrar bağlanma
  bot.on('end', () => {
    console.log('Bağlantı koptu, 10 saniye sonra tekrar bağlanılıyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Hata:', err));
}

createBot();
