from subprocess import check_call
import sys
import os
import os.path as op
import shutil as sh
from glob import glob
import argparse
import string
DESCRIPTION = ("Check whether a license exists, and add one if desired.")
CC_BY_SA_LCENSE = ["# License for this book",
                   "",
                   "All content in this book (ie, any files and content in the `content/` folder)",
                   "is licensed under the",
                   "[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0) license."]

parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("--path", default=None, help="Path to the folder where you'll check for a license.")
parser.add_argument("--use-license", default=None, help="A pre-defined input for the user-prompt")

if __name__ == '__main__':

    args = parser.parse_args()
    path = args.path
    use_license = args.use_license

    path_license = op.join(path, 'LICENSE.md')
    if op.exists(path_license):
        print("It looks like you've already specified a license for this book, good job!")
        sys.exit()
    
    print("\n\nWe noticed you don't have a license for this book. Licenses help \n"
          "others (re)use your work, and make it clear which rights you wish to \n"
          "retain for your work. We recommend the CC-BY-SA license, a permissive \n"
          "and open license that requires attribution to the original author. \n"
          "Would you like to apply this license to your book?\n\n")

    if use_license is None:
        use_license = input("Would you like to use the CC-BY-SA license? (yes)/no: ") or "yes"

    if use_license == "yes":
        with open(path_license, 'w') as ff:
            print("\nCreating a CC-BY-SA license file...\n")
            ff.write('\n'.join(CC_BY_SA_LCENSE))
    elif use_license == "no":
        print("\n\nYou've decided not to use the CC BY-SA license. We've added an empty \n"
              "'LICENSE.md file to your `content/` folder so that this message doesn't come \n"
              "up again. We recommend filling this file with language that specifies what \n"
              "license applies to your book. Check out the Creative \n"
              "Commons licenses for several options: https://creativecommons.org/licenses\n\n")
        with open(path_license, 'w') as ff:
            pass
    else:
        raise ValueError("Please choose 'yes' or 'no', you chose: '{}'".format(use_license))




