const http = require('http');

// Render'ın "No open ports" uyarısını engellemek için mini web sunucusu
http.createServer((req, res) => {
  res.write("AFK Botu 7/24 Aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

const botOptions = {
  host: 'oyna.wrus.net', // Örn: sunucun.aternos.me
  port: 25565,               // Portun varsa değiştir, yoksa 25565 kalsın
  username: 'txcpsyc724',    // Botun adı
  version: '1.20.1'          // Java/Geyser uyumluluğu için sürüm belirtildi
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla bağlandı!');

    // 1. ADIM: 3. saniyede ilk şifre
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 3000);

    // 2. ADIM: 6. saniyede ikinci şifre
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 6000);

    // 3. ADIM: 9. saniyede Gmail adresi
    setTimeout(() => {
      bot.chat('harun123455789pp@gmail.com'); 
    }, 9000);

    // 4. ADIM: 12. saniyede 5. slottaki pusulayı kullanma
    setTimeout(async () => {
      try {
        const slotIndex = 4; // 5. slot
        const item = bot.inventory.slots[slotIndex];
        
        if (item) {
          await bot.equip(item, 'hand');
          bot.activateItem();
          console.log('5. slottaki pusula kullanıldı, menü açılıyor...');
        } else {
          console.log('5. slotta pusula bulunamadı!');
        }
      } catch (err) {
        console.log('Pusula kullanılırken hata:', err);
      }
    }, 12000);

    // 5. ADIM: 15. saniyede menüden 21. slota tıklama (Survival)
    setTimeout(() => {
      try {
        const survivalSlot = 20; // 21. slot
        
        if (bot.currentWindow) {
          bot.clickWindow(survivalSlot, 0, 0);
          console.log('Survival seçeneğine tıklandı!');
        } else {
          console.log('Menü açık değil!');
        }
      } catch (err) {
        console.log('Menüye tıklanırken hata:', err);
      }
    }, 15000);

    // 6. ADIM: 19. saniyede AFK alanına ışınlanma
    setTimeout(() => {
      bot.chat('/warp afk');
      console.log('/warp afk gönderildi!');
    }, 19000);

  });

  // Düşmemek için dakikada bir zıplama
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  // Koparsa tekrar bağlanma
  bot.on('end', () => {
    console.log('Bağlantı koptu, 10sn sonra tekrar deneniyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Hata:', err));
}

createBot();

}

createBot();
