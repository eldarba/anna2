rem echo about to start commiting all changes. press CTRL + C to abort
rem pause
git pull origin
git status
git add --all
git commit -m "auto commit batch"
git push origin
git status
rem pause