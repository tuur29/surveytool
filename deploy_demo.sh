#!/bin/sh

# CONFIG

buildcommand="yarn build"
distdir="build"
basebranch="master"
destbranch="gh-pages"


# CODE

if [[ "$(git status)" == *"nothing to commit, working tree clean"* ]]; then

    # remove subfolder from gitignore
    rm -rf $distdir
    sed -i -e "s/\/$distdir/#\/$distdir/g" .gitignore

    # build app
    echo -e "\nNo uncomitted changes, building...\n"
    if eval $buildcommand; then

        echo -e "\nSuccessful build, deploying...\n"

        # deploy to Github Pages
        git add .
        git commit -m "Deploy"
        git push origin `git subtree split --prefix $distdir $basebranch`:$destbranch --force
        git reset HEAD~

        # reset temp changes
        git checkout -- .
        echo -e "\nDeployed!\n"
        
    else
        git checkout -- .
        echo -e "\nApp failed to build!\n"
    fi

else
    echo -e "\nThere were uncommitted changes!"
    printf "Do you want to deploy these as well? (y/n):  "

    read commit
    if [[ "$commit" == "y" ]]; then
        git add .
        git commit -m "Temp"
        ./$0 undocommit
    else
        git stash
        ./$0 undostash
    fi
fi


if [[ "$1" == "undocommit" ]]; then
    git reset HEAD^
fi

if [[ "$1" == "undostash" ]]; then
    git stash apply
fi