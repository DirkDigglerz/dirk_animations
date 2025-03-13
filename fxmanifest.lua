 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
author 'DirkScripts' 
description 'Dirk Animations | Pause menu for FiveM'
version      '1.0.19' 

shared_script {
  '@dirk_lib/init.lua',
  'src/shared/*.lua',
}

client_script { 
  'src/client/*.lua',
} 

server_script { 
  'src/server/*.lua',
}
 

ui_page 'web/build/index.html'

files {
  'locales/*.json',
  'settings/*.lua',
  'settings/**/*.lua',
	'web/build/index.html',
	'web/build/**/*',
}

dependency 'dirk_lib'